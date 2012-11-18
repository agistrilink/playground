<?php

// @todo error handling
class Config {
	protected static $config;
	protected $values;
	
	public static function init($c) {
		if (isset(self::$config))
			return;
		
		self::$config = $c->getInvokeArg('bootstrap')->getOptions();
	}
	
	public static function get($key, $section = 'app') {
		return self::$config[$section][$key];
	}
	
	public static function getInstance($section = 'app') {
		$config = new self;
		$config->values =& self::$config[$section];		
	}
	
	public function __get($key) {
		return $this->values[$key];
	}
}
