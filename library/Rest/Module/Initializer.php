<?php
class Rest_Module_Initializer extends Offshoot_Application_Module_Initializer {
	public function _initRest() {
//    	echo 'boe3: '.__CLASS__.'::'.__FUNCTION__;exit;
   		$fc = Zend_Controller_Front::getInstance();

		// add Rest contextSwitch helper
		$contextSwitch = new Rest_Controller_Action_Helper_ContextSwitch();
		Zend_Controller_Action_HelperBroker::addHelper($contextSwitch);

		// add restContexts helper
		$restContexts = new Rest_Controller_Action_Helper_RestContexts();
		Zend_Controller_Action_HelperBroker::addHelper($restContexts);

		// rest_handler dispatches errors too on the basis of these values
		$pluginErrorHandler = Zend_Controller_Front::getInstance()->getPlugin('Zend_Controller_Plugin_ErrorHandler');
		$pluginErrorHandler->setErrorHandlerModule($fc->getRequest()->getModuleName());//->setErrorHandlerController('error')->setErrorHandlerAction('error');
	}
}