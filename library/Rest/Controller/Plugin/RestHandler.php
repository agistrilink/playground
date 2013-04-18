<?php
/**
 * Responsible for setting the HTTP Vary header,
 * setting the context switch based on the Accept header
 * and processing the incoming request formats
 */
class Rest_Controller_Plugin_RestHandler extends Zend_Controller_Plugin_Abstract
{
	const EXCEPTION_REST = 'EXCEPTION_REST';
	
    private $dispatcher;

    private $defaultFormat = 'html';

    private $acceptableFormats = array(
        'html',
        'xml',
        'php',
        'json'
    );

    private $responseTypes = array(
        'text/html'                         => 'html',
        'application/xhtml+xml'             => 'html',
        'text/xml'                          => 'xml',
        'application/xml'                   => 'xml',
        'application/xhtml+xml'             => 'xml',
        'text/php'                          => 'php',
        'application/php'                   => 'php',
        'application/x-httpd-php'           => 'php',
        'application/x-httpd-php-source'    => 'php',
        'text/javascript'                   => 'json',
        'application/json'                  => 'json',
        'application/javascript'            => 'json'
    );

    private $requestTypes = array(
        'multipart/form-data',
        'application/x-www-form-urlencoded',
        'text/xml',
        'application/xml',
        'text/php',
        'application/php',
        'application/x-httpd-php',
        'application/x-httpd-php-source',
        'text/javascript',
        'application/json',
        'application/javascript',
        false
    );

    protected $restModules = array();
    public function __construct($restModules = array()) {
    	$this->restModules = $restModules;
    }
    
    public function getMethod()
    {
    	if ($this->_request->getParam('_method', false)) {
    		return strtoupper($this->_request->getParam('_method'));
    	}
    
    	if ($this->_request->getHeader('X-HTTP-Method-Override')) {
    		return strtoupper($this->_request->getHeader('X-HTTP-Method-Override'));
    	}
    
    	// for PUT & DELETE, see http://mattgeri.com/blog/2010/08/accepting-restful-requests-with-php/
    	return $this->_request->getServer('REQUEST_METHOD');
    }
    
    public function dispatchLoopStartup(Zend_Controller_Request_Abstract $request)
    {
    	// called for all modules - do only for rest ones
    	if (!in_array($request->getModuleName(), $this->restModules)) return;

    	// send the HTTP Vary header
        $this->_response->setHeader('Vary', 'Accept');

        // Cross-Origin Resource Sharing (CORS)
        // TODO: probably should be an environment setting?
        $this->_response->setHeader('Access-Control-Max-Age', '86400');
        $this->_response->setHeader('Access-Control-Allow-Origin', '*');
        $this->_response->setHeader('Access-Control-Allow-Credentials', 'true');
        $this->_response->setHeader('Access-Control-Allow-Headers', 'Authorization, X-Authorization, Origin, Accept, Content-Type, X-Requested-With, X-HTTP-Method-Override');

        // set config settings from application.ini
        $this->setConfig();

        // VIP kharrold 20130101: The key to get rid of Rest_Request, see also the ErrorController
        // that handles the $error being passed as 'rest_handler' param
        try {
	        // set response format
	        $this->setResponseFormat($request);
	
	        // process requested action
	        $this->handleActions($request);
	
	        // process request body
	        $this->handleRequestBody($request);
        }
        catch (Rest_Exception $re) {
        	$error = new ArrayObject(array(), ArrayObject::ARRAY_AS_PROPS);
        	$error->type = self::EXCEPTION_REST;
        	$error->code = $re->getHttpCode();
        	$error->message = $re->getMessage();
        	$error->exception = $re;
        	$request->setParam('rest_handler', $error);
        	
        	// make sure the plugin error handler points to the right direction - if no values are set: default/error/error
        	$pluginErrorHandler = Zend_Controller_Front::getInstance()->getPlugin('Zend_Controller_Plugin_ErrorHandler');
        	$request->setModuleName($pluginErrorHandler->getErrorHandlerModule());
        	$request->setControllerName($pluginErrorHandler->getErrorHandlerController());
        	$request->setActionName($pluginErrorHandler->getErrorHandlerAction());
        	$request->setDispatched(true);
        }
    }

    private function setConfig()
    {
        $frontController = Zend_Controller_Front::getInstance();
        $options = new Zend_Config($frontController->getParam('bootstrap')->getOptions(), true);

        $rest = $options->get('rest', false);

        if ($rest) {
            $this->defaultFormat = $rest->default;
            $this->acceptableFormats = $rest->formats->toArray();
        }
    }

    /**
     * sets the response format and content type
     * uses the "format" query string paramter and the HTTP Accept header
     */
    private function setResponseFormat(Zend_Controller_Request_Abstract $request)
    {
        $format = false;

        // check query string first
        if (in_array($request->getParam('format', 'none'), $this->responseTypes)) {
            $format = $request->getParam('format');
        } else {
            $bestMimeType = $this->negotiateContentType($request);

            // if there's no matching MimeType, assign default XML
            if (!$bestMimeType || $bestMimeType == '*/*') {
                $bestMimeType = 'application/xml';
            }

            $format = $this->responseTypes[$bestMimeType];
        }
        
        if ($format == false or !in_array($format, $this->acceptableFormats)) {
            $request->setParam('format', $this->defaultFormat);
            
            if ($request->isOptions() === false)
            	throw new Rest_Exception('Unsupported Media/Format Type', Http_Response_Code::UNSUPPORTED_TYPE);
        } else {
            $request->setParam('format', $format);
        }
    }

    /**
     * determines whether the requested actions exists
     * otherwise, triggers optionsAction.
     */
    private function handleActions(Zend_Controller_Request_Abstract $request)
    {
        // get the dispatcher to load the controller class
        $dispatcher = Zend_Controller_Front::getInstance()->getDispatcher();
        $controller = $dispatcher->getControllerClass($request);
        $className  = $dispatcher->loadClass($controller);

        // extract the actions through reflection
        $class = new ReflectionClass($className);

        if ($this->isRestClass($class)) {
            $methods = $class->getMethods(ReflectionMethod::IS_PUBLIC);

            $actions = array();

            foreach ($methods as &$method) {
                $name = strtoupper($method->name);

                if ($name == '__CALL' and $method->class != 'Zend_Controller_Action') {
                    $actions[] = $request->getMethod();
                } elseif (substr($name, -6) == 'ACTION' and $name != 'INDEXACTION') {
                    $actions[] = str_replace('ACTION', null, $name);
                }
            }

            // Cross-Origin Resource Sharing (CORS)
            $this->_response->setHeader('Access-Control-Allow-Methods', implode(', ', $actions));

            if (!in_array(strtoupper($request->getMethod()), $actions)) {
                $this->_response->setHeader('Allow', implode(', ', $actions));
                
            	throw new Rest_Exception('Method Not Allowed', Http_Response_Code::NOT_ALLOWED);
            }
        }
    }

    /**
     * PHP only parses the body into $_POST if its a POST request
     * this parses the reqest body in accordance with RFC2616 spec regardless of the HTTP method
     */
    private function handleRequestBody(Zend_Controller_Request_Abstract $request)
    {
        $header = strtolower($request->getHeader('Content-Type'));

        // cleanup the charset part
        $header = current(explode(';', $header));

        // detect request body content type
        foreach ($this->requestTypes as $contentType) {
            if ($header == $contentType) {
                break;
            }
        }

        // extract the raw body
        $rawBody = $request->getRawBody();

        // treat these two separately because of the way PHP treats POST
        if (in_array($contentType, array('multipart/form-data', 'application/x-www-form-urlencoded'))) {
            // PHP takes care of everything for us in this case lets just modify the $_FILES array
            if ($request->isPost() && $contentType == 'multipart/form-data') {
                // if there are files, lets modify the array to match what we've done below
                foreach ($_FILES as &$file) {
                    if (array_key_exists('tmp_name', $file) && is_file($file['tmp_name'])) {
                        $data = file_get_contents($file['tmp_name']);
                        $file['content'] = base64_encode($data);
                    }
                }

                // reset the array pointer
                unset($file);
            } else {
                switch ($contentType) {
                    case 'application/x-www-form-urlencoded':
                        parse_str($rawBody, $_POST);
                        break;

                    // this is wher the magic happens
                    // creates the $_FILES array for none POST requests
                    case 'multipart/form-data':
                        // extract the boundary
                        parse_str(end(explode(';', $request->getHeader('Content-Type'))));

                        if (isset($boundary)) {
                            // get rid of the boundary at the edges
                            if (preg_match(sprintf('/--%s(.+)--%s--/s', $boundary, $boundary), $rawBody, $regs)) {

                                // split into chuncks
                                $chunks = explode('--' . $boundary, trim($regs[1]));

                                foreach ($chunks as $chunk) {
                                    // parse each chunk
                                    if (preg_match('/Content-Disposition: form-data; name="(?P<name>.+?)"(?:; filename="(?P<filename>.+?)")?(?P<headers>(?:\\r|\\n)+?.+?(?:\\r|\\n)+?)?(?P<data>.+)/si', $chunk, $regs)) {

                                        // dedect a file upload
                                        if (!empty($regs['filename'])) {

                                            // put aside for further analysis
                                            $data = $regs['data'];

                                            $headers = $this->parseHeaders($regs['headers']);

                                            // set our params variable
                                            $_FILES[$regs['name']] = array(
                                                'name' => $regs['filename'],
                                                'type' => $headers['Content-Type'],
                                                'size' => mb_strlen($data),
                                                'content' => base64_encode($data)
                                            );
                                        // otherwise its a regular key=value combination
                                        } else {
                                            $_POST[$regs['name']] = trim($regs['data']);
                                        }
                                    }
                                }
                            }
                        }
                        break;
                }
            }

            $request->setParams($_POST + $_FILES);
        } elseif (!empty($rawBody)) {
            // seems like we are dealing with an encoded request
            try {
                switch ($contentType) {
                    case 'text/javascript':
                    case 'application/json':
                    case 'application/javascript':
                        $_POST = (array) Zend_Json::decode($rawBody, Zend_Json::TYPE_OBJECT);
                        break;

                    case 'text/xml':
                    case 'application/xml':
                        $json = @Zend_Json::fromXml($rawBody);
                        $_POST = (array) Zend_Json::decode($json, Zend_Json::TYPE_OBJECT)->request;
                        break;

                    case 'text/php':
                    case 'application/x-httpd-php':
                    case 'application/x-httpd-php-source':
                        $_POST = (array) unserialize($rawBody);
                        break;

                    default:
                        $_POST = (array) $rawBody;
                        break;
                }

                $request->setParams($_POST);

            } catch (Exception $e) {
            	throw new Rest_Exception('Invalid Payload Format', Http_Response_Code::BAD_REQUEST);
                return;
            }
        }
    }

    /**
     * determines if the requested controller is a Restful controller
     **/
    private function isRestClass($class)
    {
        if ($class === false) {
            return false;
        } elseif (in_array($class->name, array('Zend_Rest_Controller', 'Rest_Controller'))) {
            return true;
        } else {
            return $this->isRestClass($class->getParentClass());
        }
    }

    /**
     * utility function to replace http_parse_headers when its not available
     * see: http://pecl.php.net/pecl_http
     **/
    private function parseHeaders($header)
    {
        if (function_exists('http_parse_headers')) {
            return http_parse_headers($header);
        }

        $retVal = array();
        $fields = explode("\r\n", preg_replace('/\x0D\x0A[\x09\x20]+/', ' ', $header));
        foreach( $fields as $field ) {
            if( preg_match('/([^:]+): (.+)/m', $field, $match) ) {
                $match[1] = preg_replace('/(?<=^|[\x09\x20\x2D])./e', 'strtoupper("\0")', strtolower(trim($match[1])));
                if( isset($retVal[$match[1]]) ) {
                    $retVal[$match[1]] = array($retVal[$match[1]], $match[2]);
                } else {
                    $retVal[$match[1]] = trim($match[2]);
                }
            }
        }

        return $retVal;
    }

    /**
     * utility function to replace http_negotiate_content_type when its not available
     * see: http://pecl.php.net/pecl_http
     **/
    private function negotiateContentType($request)
    {
        if (function_exists('http_negotiate_content_type')) {
            return http_negotiate_content_type(array_keys($this->responseTypes));
        }

        $string = $request->getHeader('Accept');

        $mimeTypes = array();

        // Accept header is case insensitive, and whitespace isn't important
        $string = strtolower(str_replace(' ', '', $string));

        // divide it into parts in the place of a ","
        $types = explode(',', $string);

        foreach ($types as $type) {
            // the default quality is 1.
            $quality = 1;

            // check if there is a different quality
            if (strpos($type, ';q=')) {
                // divide "mime/type;q=X" into two parts: "mime/type" / "X"
                list($type, $quality) = explode(';q=', $type);
            } elseif (strpos($type, ';')) {
                list($type, ) = explode(';', $type);
            }

            // WARNING: $q == 0 means, that mime-type isn't supported!
            if (array_key_exists($type, $this->responseTypes) and !array_key_exists($quality, $mimeTypes)) {
                $mimeTypes[$quality] = $type;
            }
        }

        // sort by quality descending
        krsort($mimeTypes);

        return current(array_values($mimeTypes));
    }
}
