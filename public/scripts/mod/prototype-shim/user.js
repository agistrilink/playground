define([
        'prototype'
	],
	function(Prototype) {
		var User = Prototype.Class.create({
			initialize: function(name) {
				this.name = name;
			},
			toString: function() {
				return 'Name: ' + this.name;
			}
		});

		Object.extend(User, {
			newInstance: function(name) {
				return new User(name);
			}
		});

		return User;
	}
);

