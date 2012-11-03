define([
		"mod/tree/path/main_path",
		"mod/tree/path/elt",
		"mod/tree/view/main_view"    
	],
	function(path, elt, view) {
		return {
			create: function() {
//alert('mod_main_tree');
				
				// create the path under the wrapper
				var jqPath = path.create().appendTo($('#path_wrapper'));
				
				// append the initial result node that came from the server to the path as level 1
				var jqNode = $('#__initial__ li[name=expand] > :first');
				jqPath.trigger('append', [elt.create(jqNode, 1)]);
				
				// didge the initial result
				jqNode.remove();
			}
		}
	}
);
