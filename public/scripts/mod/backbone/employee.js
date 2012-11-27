define([
	 	'mod/user',
	],
	function(User) {
		var Employee = User.extend({
			toString: function() {
				return 'Dept: ' + this.get('dept') + ', ' + Employee.__super__.toString.call(this);
			}
		}, {
			newInstance: function(dept, name) {
				return new Employee({dept: dept, name: name});
			}
		});
		
		return Employee;
	}
);

