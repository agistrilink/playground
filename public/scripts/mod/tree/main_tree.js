define([
        'jquery',
		'mod/tree/path/item',
		'utils/system',
		'utils/jquery.debug'
	],
	function($, PathItem, System) {		
		return {
			create: function() {
				PathItem.expand(PathItem.root, System.initialAjax('expand'));
			}
		}
	}
);
/*
needs renaming:

path_wrapper => #path
path_item_list => list of path_item
path_item => node, expand
node
expand => button, menu

pathWrapper.js
pathItemList.js
pathItem.js
pathItemNode.js
pathItemExpand.js
pathItemExpandButton.js
pathItemExpandMenu.js

*/