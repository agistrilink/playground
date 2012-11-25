define([
        'jquery',
        'spine',
        'utils/jquery.debug'
	],
	function($, Spine) {
		var User = Spine.Class.sub({
			
			init: function(name) {
				this.name = name;
			},
			
			toString: function() {
				return 'Name: ' + this.name;
			}
			
		}, {
			
			newInstance: function(name) {
				return new User(name);
			}
		
		});
		
		return User;
	}
);

