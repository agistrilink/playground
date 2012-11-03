
/*
 * Story on requirejs in combination with jquery
 * 1. dom/jquery nodes are instances
 * 2. requirejs are modules to specifiy the live events (cf. statics)
 */

// See https://docs.google.com/open?id=0B3oG2TUFxqx-ZTg2Y2QzN2ItNDQwNy00YTkyLWI4ZDAtOGY5ODJiNGE1YzY2 for documentation
require({
		paths: {
			'jquery.ui':'http/ajax.googleapis.com/ajax/libs/jqueryui/1.9m6',
			'jquery.tools':'http/cdn.jquerytools.org/1.2.6'
		}
	},
	['domReady!', 'mod/tree/main_tree', 'req/gameartstudio/misc'],
	function(doc, tree) {
		tree.create();
	}
);
/*
require({
		paths: {
			'jquery.ui':'http/ajax.googleapis.com/ajax/libs/jqueryui/1.9m3',
			'jquery.tools':'http/cdn.jquerytools.org/1.2.5'
		}
	},
	['mod/tree/main_tree', 'req/gameartstudio/misc'],
	function(tree) {
		$(document).ready(function(){
//			tree.create();
//			show("#__initial__");
			alert('test');
		});
	}
);
*/