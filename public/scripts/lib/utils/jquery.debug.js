define(
	['jquery'],
	
	function(jQuery) { // requirejs wrapping for jQuery plugins
		(function($) { // standard jQuery plugin wrapping for $
		
			$.fn.alert = function() {
				return this.each(function() { // standard jQuery plugin each result set
					alert($('<div>').append($(this).clone()).remove().html());
				});
			};
				
		})(jQuery);
	}
);