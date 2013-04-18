<?php
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    public function _initRest()
    {
        $fc = Zend_Controller_Front::getInstance();

        // VIP kharrold 20130101
        // A lot of effort has been put in getting rid of these spezialized request/response pair
        // (which would be instantiated also for non rest routes
//        $fc->setRequest(new Rest_Request);
//        $fc->setResponse(new Rest_Response);

$fc->addControllerDirectory(APPLICATION_PATH.'/controllers', 'default');
//Zend_Debug::dump($fc->getControllerDirectory());
        $restModules = array('api');
        
        // add the Rest route for the API module only
        $fc->getRouter()->addRoute('rest', new Zend_Rest_Route($fc, array(), $restModules));
//        $fc->getRouter()->removeDefaultRoutes();
//        $fc->addControllerDirectory(APPLICATION_PATH."/controllers", 'default');
//Zend_debug::dump($fc->getRouter()->getRoutes());exit;
        //echo get_class($fc->getRouter());exit;
        
             
        // register the RestHandler plugin - needs dispatcher in dispatching to ErrorController
        $fc->registerPlugin(new Rest_Controller_Plugin_RestHandler($restModules));
        $fc->registerPlugin(new Rest_Controller_Plugin_RestModule($restModules));
    }
    
    public function _initOffshoot() {
    	$fc = Zend_Controller_Front::getInstance();
    	$fc->registerPlugin(new Offshoot_Controller_Plugin_ActiveModule());
    }
}

