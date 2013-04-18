define([
	 	'mod/employee'
	],
	function(Employee) {

		var Developer = Employee.extend({
			initialize: function(attrs) {
				attrs.dept = 'dev';
				this.set(attrs);
			},
			toString: function() {
				return 'Project: ' + this.get('project') + ', ' + Developer.__super__.toString.call(this);
			}
		}, {
			newInstance: function(name, project) {
				return new Developer({name: name, project: project});
			}
		});
		
		return Developer;
	}
);

