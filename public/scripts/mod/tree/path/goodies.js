define([
        'jquery',
	 	'mod/tree/path/Favourites',
	 	'mod/tree/path/Overflow'
	],
	function($, Favourites, Overflow) {
		return {
			create: function() {
				return $('<span class="path_goodies"></span>')
					.append(Favourites.create())
					.append(Overflow.create())
					;
			},
			destroy: function(jqGoodies) {
				Favourites.destroy(jqGoodies.find('.path_favourites'));
				Overflow.destroy(jqGoodies.find('.path_overflow'));
				
				jqGoodies.remove();
			}
		}
	}
);
