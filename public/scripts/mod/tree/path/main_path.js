define([
        'jquery',
	 	'mod/tree/path/goodies',
	 	'mod/tree/path/elt',
        'jqueryui/button', // as last item as it is not needed in the parameter list
        'utils/jquery.debug'
	],
	function($, Goodies, PathNode) {
alert('mod_path_main_path');

		// increase (e.g. 400) to have quicker overflow while testing, 0 otherwise
		var padding = 400; 
		
		var availableWidth = function(jqPath) {
			return jqPath.parent().width() - jqPath.find('.path_goodies').width() - jqPath.width();
		}
		
		var overflowing = function(jqPath, requiredWidth) {
//alert('+: ' + (availableWidth(jqPath) - requiredWidth));
			if (availableWidth(jqPath) - requiredWidth >= padding) return;
			
			// overflow! hide left most and push to overflow
			var jqLeftMostVisibleElt = 
				jqPath.find('.path_elt:visible').eq(0);
			jqLeftMostVisibleElt.hide();
			jqPath.find('.path_overflow').trigger('push', [jqLeftMostVisibleElt]);
			
			overflowing(jqPath, requiredWidth);
		}
		
		var underflowing = function(jqPath) {
			var jqPathNode = jqPath.children(':hidden').last();
			
			if (!jqPathNode.length) return;
//alert('-: ' + (availableWidth(jqPath) - jqPathNode.data('width')));
			if (availableWidth(jqPath) - jqPathNode.data('width') < padding) return;			
			
			jqPathNode.show();
			jqPath.find('.path_overflow').trigger('pop');
			
			underflowing(jqPath);
		}
		
		var jqPathWrapper = $('#path_wrapper');
		
		jqPathWrapper.on('jump', '.path', function(event, jqPathNode) {
			var jqPath = $(this);
			
			var selector = ':gt(' + jqPathNode.data('level') + ')';
			PathNode.destroy(jqPath.children(selector));
			underflowing(jqPath);				
		});
		
		jqPathWrapper.on('expand', '.path', function(event, node_id, level) {
			var jqPath = $(this);
			
			var url = $(document).data('baseUrl') + '/tree/expand';
			$.get(url, {node_id: node_id}, function(node){
				var jqPathNode = PathNode.create($(node), level);
				jqPath.trigger('append', [jqPathNode]);
			});
			
			return false;
		});
		
		jqPathWrapper.on('append', '.path', function(event, jqPathNode) {
			var jqPath = $(this);
			jqPath.alert();
		
			var level = jqPathNode.data('level');
			
			// length includes 1 goodies node! no plus or minus one calculation
			if (jqPath.children().length > level) {
				var selector = ':eq(' + level + '), :gt(' + level + ')';
				PathNode.destroy(jqPath.children(selector));
//				var jqPathNode = jqPath.children().eq(level);
//				PathNode.destroy(jqPathNode.nextAll().add(jqPathNode));
//				PathNode.destroy(jqPathNode.add(jqPathNode.nextAll()));
			}
			
			// @todo
//			overflowing(jqPath, jqPathNode.width());
			jqPath.append(jqPathNode);
//			underflowing(jqPath);
			
			return false;
		});

		return {
			create: function() {
				return $('<span class="path"></span>');//.append(Goodies.create());
			},
			destroy: function(jqPath) {
				Goodies.destroy(jqPath.find('.path_goodies'));
				jqPath.children().each(function(){
					PathNode.destroy($(this));
				});
				jqPath.remove();
			},
			getWrapper: function() {
				return jqPathWrapper;
			}
		}
	}
);
//*/
