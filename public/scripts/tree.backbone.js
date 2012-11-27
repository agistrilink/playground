/*
 * 
 */

define([
        'mod/developer'
	],
	function(Developer) {
		alert('bb no syntax error');
		
		alert(Developer.newInstance('harrold korte', 'game1-4').toString());

//		_.each([1, 2, 3], function(num){ alert(num); });

//		['one', 'two', 'three'].each(alert);
	}
);
