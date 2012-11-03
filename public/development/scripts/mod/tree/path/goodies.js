define([
	 	'mod/tree/path/favourites',
	 	'mod/tree/path/overflow'
	],
	function(favourites, overflow) {
		return {
			create: function() {
				return $('<span class="path_goodies"></span>')
					.append(favourites.create())
					.append(overflow.create())
					;
			},
			destroy: function(jqGoodies) {
				favourites.destroy(jqGoodies.find('.path_favourites'));
				overflow.destroy(jqGoodies.find('.path_overflow'));
				
				jqGoodies.remove();
			}
		}
	}
);
