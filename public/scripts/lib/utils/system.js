define([
        'jquery',
	 	'utils/system',
        'utils/jquery.debug'
	],
	function($) {
		var System = {
			initialAjax: function(name) {
				return $.initial('[title=' + name + ']').find('> :first');
			}
		}
		
		return System;
	}
);

