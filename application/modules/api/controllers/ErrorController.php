<?php
/**
 * Restful ErrorController
 *
 **/
class Api_ErrorController extends Rest_Controller
{
    public function errorAction()
    {
        // new - do this instead of the above
		$errors = $this->_getParam('rest_handler');
		if (!$errors)
			// see http://framework.zend.com/manual/1.12/en/zend.controller.plugins.html;
			// ^f for the "Zend_Controller_Plugin_ErrorHandler" section 
	        $errors = $this->_getParam('error_handler');

        if (!$errors || !$errors instanceof ArrayObject) {
            $this->view->message = 'You have reached the error page';
            return;
        }

        switch ($errors->type) {
        	case Rest_Controller_Plugin_RestHandler::EXCEPTION_REST:
	            $this->view->message = $errors->message;
	            $this->getResponse()->setHttpResponseCode($errors->code);
        		break;
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ROUTE:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_CONTROLLER:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ACTION:
                // 404 error -- controller or action not found
                $this->view->message = 'Page not found';
                $this->getResponse()->setHttpResponseCode(404);
                break;

            default:
                // application error
                $this->view->message = 'Application error';
                $this->getResponse()->setHttpResponseCode(500);
                break;
        }

        // conditionally display exceptions
        if ($this->getInvokeArg('displayExceptions') == true) {
            $this->view->exception = $errors->exception->getMessage();
        }
    }

    /**
     * Catch-All
     * useful for custom HTTP Methods
     *
     **/
    public function __callAction()
    {
    }

    /**
     * Index Action
     *
     * @return void
     */
    public function indexAction()
    {
    }

    /**
     * GET Action
     *
     * @return void
     */
    public function getAction()
    {
    }

    /**
     * POST Action
     *
     * @return void
     */
    public function postAction()
    {
    }

    /**
     * PUT Action
     *
     * @return void
     */
    public function putAction()
    {
    }

    /**
     * DELETE Action
     *
     * @return void
     */
    public function deleteAction()
    {
    }
}

