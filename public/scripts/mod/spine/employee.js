define([
        'jquery',
	 	'mod/user',
        'utils/jquery.debug'
	],
	function($, User) {
		var Employee = User.sub({
			init: function(dept, name) {
				// this allows for a parent use of only one deep!
				// i.e. Employee cannot be subclassed as it will go into
				// indefinite recursion
				this.constructor.__super__.init.call(this, name);
				
				this.dept = dept;
			},
			toString: function() {
				return 'Dept: ' + this.dept + ', ' + this.constructor.__super__.toString.call(this);
			}
		}, {
			newInstance: function(dept, name) {
				return new Employee(dept, name);
			}
		});
		
		return Employee;
	}
);

