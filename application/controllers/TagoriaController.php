<?php

class TagoriaController extends Zend_Controller_Action
{

    public function init()
    {
        $this->view->addScriptPath(APPLICATION_PATH.'/views/scripts/tree');
    }

    public function indexAction()
    {    	
    }
}

