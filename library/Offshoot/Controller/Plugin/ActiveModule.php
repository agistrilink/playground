<?php

class Offshoot_Controller_Plugin_ActiveModule
extends Zend_Controller_Plugin_Abstract
{

	public function routeStartup(Zend_Controller_Request_Abstract $request)
	{
		$fc = Zend_Controller_Front::getInstance();
		
	}
	public function routeShutdown(Zend_Controller_Request_Abstract $request)
	{
	 
	    $activeModuleName = $request->getModuleName();
	    $activeBootstrap = $this->_getActiveBootstrap($activeModuleName);
	 
	    if ($activeBootstrap instanceof Offshoot_Application_Module_Bootstrap) {
	 
	        $className = ucfirst($activeModuleName) . '_Bootstrap_Initializer';
	 
	        // don't assume that every module has an initializer...
	        if (class_exists($className)) {
	            $intializer = new $className($activeBootstrap);
	            $intializer->initialize();
	        }
	 
	    }	 
	}
	
	/**
	 * return the default bootstrap of the app
	 * @return Zend_Application_Bootstrap_Bootstrap
	 */
	protected function _getBootstrap()
	{
		$frontController = Zend_Controller_Front::getInstance();
		$bootstrap =  $frontController->getParam('bootstrap');

		return $bootstrap;
	}

	/**
	 * return the bootstrap object for the active module
	 * @return Offshoot_Application_Module_Bootstrap
	 */
	public function _getActiveBootstrap($activeModuleName)
	{

		$moduleList = $this->_getBootstrap()->getResource('modules');
//echo 'boe4:<br>'.Zend_Debug::dump($moduleList);exit;
		if (isset($moduleList[$activeModuleName])) {
			return $moduleList[$activeModuleName];
		}

		return null;

	}

}
