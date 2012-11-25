define([
        'prototype/class',
	 	'mod/user'
	],
	function(Class, User) {
		var Employee = Class.create(User, {
			initialize: function($super, dept, name) {
				$super(name);
				
				this.dept = dept;
			},
			toString: function($super) {
				return 'Dept: ' + this.dept + ', ' + $super();
			}
		});

		Object.extend(Employee, {
			newInstance: function(dept, name) {
				return new Employee(dept, name);
			}
		});
		
		return Employee;
	}
);

