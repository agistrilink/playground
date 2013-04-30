define([
        'exports',
        'jquery',
	 	'mod/tree/path/node',
	 	'mod/tree/path/expand',
	 	'utils/jquery.debug'
	],
	function(exports, $, PathNode, PathExpand) {
		
		var expand = function(jqPathItem, name, jqNode) {
			var jqNextPathItem = PathItem.create(jqPathItem, name);
			
			if (typeof(jqNode) != 'undefined')
				return jqNextPathItem.append(PathItemExpand.create(jqNode));
			
			$.get(url, {}, function(rsp) {
				var jqNode = $(rsp).find('> :first');
				jqNextPathItem.append(PathItemExpand.create(jqNode));
			});
			
			return jqNextPathItem;
		}
		
		var parent = function (elt) {
			return $(elt).parents('.path_item');
		}

		var PathItem = {
			root: this.create($(), '/'),
			create: function(jqPrev, name) {
				jqPathItem = 
					$('<span class="path_item"></span>')
						.data('prev', jqPrev)
						.append(PathItemNode.create(name))
						;
					
				jqPrev
					.data('next', jqPathItem)
					.after(Overflow.refresh(jqPathItem))
					;
				
				PathItemNode.create(jqNode, level).appendTo(jqPathNode);
				ExpandMenu.create(jqNode, level).appendTo(jqPathNode); // $() for leaf
//				jqPathNode.alert();
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
			},
			setExpand: function(jqPathItem, jqPathItemExpand) {
				return jqPathItem.append(jqPathItemExpand);
			}
		};
		
		exports.expand = expand;
		exports.parent = parent;
		return PathItem;
	}
);
