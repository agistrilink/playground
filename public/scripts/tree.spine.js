/*
 * 
 */

define([
		'jquery',
		'mod/employee'
	],	
	function($, Employee) {
		alert(Employee.newInstance('dev', 'harrold korte').toString());
	}
);
