define([
        'prototype',
	 	'mod/employee'
	],
	function(Prototype, Employee) {

		var Developer = Prototype.Class.create(Employee, {
			initialize: function($super, name, project) {
				$super('dev', name);
				
				this.project = project;
			},
			toString: function($super) {
				return 'Project: ' + this.project + ', ' + $super();
			}
		});
		
		Object.extend(Developer, {
			newInstance: function(name, project) {
				return new Developer(name, project);
			}
		});
		
		return Developer;
	}
);

