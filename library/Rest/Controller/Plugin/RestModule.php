<?php

class Rest_Controller_Plugin_RestModule extends Zend_Controller_Plugin_Abstract
{
	protected $restModules = array();
	public function __construct($restModules = array()) {
		$this->restModules = $restModules;
	}
	
	public function routeStartup(Zend_Controller_Request_Abstract $request) {
		$fc = Zend_Controller_Front::getInstance();
		
//		$controllerDirectory = $fc->getControllerDirectory();
		$moduleDirectory = $fc->getModuleDirectory();
		foreach ($this->restModules as $moduleName) {
			$fc->addControllerDirectory(APPLICATION_PATH.'/modules/'.$moduleName.'/controllers', $moduleName);
//			$controllerDirectory[$moduleName] = APPLICATION_PATH.'/modules/'.$moduleName.'/controllers';
		}
		
//		Zend_Debug::dump($fc->getControllerDirectory());
	}
}
