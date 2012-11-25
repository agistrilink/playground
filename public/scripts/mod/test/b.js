define([
//        'require',
        'jquery',
	 	'mod/test/a',
        'utils/jquery.debug'
	],
	function($, A) {
		$(document).on('click', function(event, s) {
			B.test();
			A.echo('A.echo: ' + s);
			A.f('A.f: ' + s);
		});
		
		var B = {
			create: function() {
				this.test();
				$(document).trigger('click', ['calling A from B through blert']);
			},
			test: function() {
				alert('B.test()');
//				$(this).find('#path_wrapper').alert();

			}
		}
		
		
		return B;
	}
);

