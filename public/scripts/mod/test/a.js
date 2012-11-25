define([
        'exports',
        'jquery',
        'spine',
	 	'mod/test/b',
        'utils/jquery.debug'
	],
	function(exports, $, Spine, BModule) {
		var echo = function(s) {
			A.test('test');
			alert(s);			
		}
		
		exports.f = echo;
		exports.echo = echo;

		var AModule = {
			create: function() {
				var b = 'b';
				alert(b);
				B.create();
			},
			test: function(s) {
				alert(s);
			}
		}
		
		return AModule;
	}
);

