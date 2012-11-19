define([
        'jquery',
        'mod/tree/path/goodies',
		'mod/tree/path/main_path',
		'mod/tree/path/elt',
		'utils/jquery.system',
		'utils/jquery.debug'
	],
	function($, Goodies, Path, PathNode) {
		return {
			create: function() {

				
				// create the goodies and the path under the wrapper
				var jqPathWrapper = $('#path_wrapper');
//				jqPathWrapper.append(Goodies.create());
				var jqPath = Path.create().appendTo(jqPathWrapper);
//				jqPathNode.alert();
				
				// append the initial result node that came from the server to the path as level 1
				var jqInitialExpand = $.initial('[ajax=expand]');
				var jqNode = jqInitialExpand.find('> :first');
				var jqPathNode = PathNode.create(jqNode, 1);								
				jqPath.trigger('append', [jqPathNode]);	
				
				// didge the initial result
				jqInitialExpand.remove();
			}
		}
	}
);
