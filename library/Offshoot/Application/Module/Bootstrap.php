<?php

class Offshoot_Application_Module_Bootstrap
extends Zend_Application_Module_Bootstrap
{
	const defaultModuleIni = 'module.ini';

	/**
	 * Constructor
	 *
	 * @param  Zend_Application|Zend_Application_Bootstrap_Bootstrapper
	 *     $application
	 * @return void
	 */
	public function __construct($application)
	{
	    parent::__construct($application);
	    $this->_loadModuleConfig();
	    $this->_loadInitializer();
	}

	protected function getConfigPath($modulePath = null, $configFileName = null) {
		if (!isset($modulePath))
			$modulePath = Zend_Controller_Front::getInstance()->getModuleDirectory(strtolower($this->getModuleName()));
		
		if (!isset($configFileName))
			$configFileName = self::defaultModuleIni;
		
		return $modulePath.'/configs/'.$configFileName;
	}
	
	/**
	 *
	 * load a module specific config file
	 */
	protected function _loadModuleConfig()
	{
		$configFile = $this->getConfigPath();
		if (!file_exists($configFile))
			return;

		$config = new Zend_Config_Ini($configFile, $this->getEnvironment());
		$this->setOptions($config->toArray());
	}
	 
	/**
	 *
	 * add the bootstrap intializer to the resource loader
	 */
	public function _loadInitializer()
	{
	    $this->getResourceLoader()->addResourceType(
	        'Bootstrap_Initializer', 'bootstrap', 'Bootstrap'
	    );
	}
}

