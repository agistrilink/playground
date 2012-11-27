define([
        'backbone'
	],
	function(Backbone) {
		var User = Backbone.Model.extend({
			toString: function() {
				return 'Name: ' + this.get('name');
			}
		}, {
			newInstance: function(name) {
				return new User({name: name});
			}
		});

		return User;
	}
);

