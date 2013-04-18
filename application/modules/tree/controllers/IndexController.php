<?php

require_once 'BaseController.php';

class Tree_IndexController extends BaseController
{
    public function init() {
    	parent::init();
    	
    	$this->view->addScriptPath(APPLICATION_PATH.'/modules/tree/views/scripts/index');
    }

    public function indexAction() {
    	$this->expandAction();
    }

    public function expandAction() {
    	$this->view->node_id = $this->getRequest()->getParam('node_id', '/');
    	$this->view->name = $this->view->node_id == '/'?'/':basename($this->view->node_id);
    	
		$this->view->nodes = array();
		$this->view->leafs = array();
		$handle  = opendir($this->view->node_id);
		while (false !== ($name = readdir($handle))) {
			$id = $this->view->node_id.($this->view->node_id == '/'?'':'/').$name;
			
			if (is_dir($id) && ($name == '.' || $name == '..')) continue;
			
			if (is_dir($id))
    			$this->view->nodes[$id] = $name;
			else
    			$this->view->leafs[$id] = $name;
		}
    }
    
    public function menuAction() {
    	
    }
}

