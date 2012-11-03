define([
	 	'mod/tree/path/button',
	 	'mod/tree/path/menu'
	],
	function(NodeButton, ExpandMenu) {
		return {
			create: function(jqNode, level) {
				var jqPathNode =
					$('<span class="path_elt" node_id="' + jqNode.attr('node_id') + '"></span>');
				
				NodeButton.create(jqNode, level).appendTo(jqPathNode);
				ExpandMenu.create(jqNode, level).appendTo(jqPathNode); // $() for leaf
				/*
				var jqMenu = ExpandMenu.create(jqNode, level);
				if (jqMenu.length) jqMenu.appendTo(jqPathNode);
				*/
				
				// offscreen rendering to become a width (needed for underflow calculation)
				return jqPathNode
					.data('level', level)
					.appendTo('#__tmp__ .offscreen') 
					.data('width', jqPathNode.width())
					;
			},
			destroy: function(jqPathNodes) { // plural destroy
				if (!jqPathNodes.length) return; // nothing to do
				
				NodeButton.destroy(jqPathNodes.find(NodeButton.selector));
				ExpandMenu.destroy(jqPathNodes.find(ExpandMenu.selector));
				
				jqPathNodes.remove();
			}
		}
	}
);
