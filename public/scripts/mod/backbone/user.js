define([
        'backbone',
        'jquery'
	],
	function(Backbone, $) {
		var User = Backbone.Model.extend({
			urlRoot: '/api/foo',
			
			initialize: function () {
				this.urlRoot = User.getBaseUrl() + this.urlRoot;
				this.set('id', ++User.id);
			},

			toString: function() {
				return 'Name: ' + this.get('name') + ', Id: ' + this.get('id');
			}
		}, {
			newInstance: function(name) {
				return new User({name: name});
			},
			
			getBaseUrl: function() {
				return $(document).data('baseUrl');
			},
			
			id:0
		});

		return User;
	}
);

