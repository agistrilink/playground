define(
	['jquery'],
	
	function(jQuery) { // requirejs wrapping for jQuery plugins
		(function($) { // standard jQuery plugin wrapping for $
		
			$.initial = function(selector) {
				return $('#__initial__').find(selector);
			};
				
		})(jQuery);
	}
);