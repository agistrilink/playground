define([
        'jquery',
        'mod/tree/path/selector',
	 	'jqueryui/button',
	 	'jqueryui/position',
	 	'jqueryui/menu',
	 	'utils/jquery.debug'
	],
	function($/*, Selector*/) {
//		var Selector = require('mod/tree/path/selector');
//		var jqPathWrapper = Selector.getPathWrapper();
//		jqPathWrapper.alert();
		
		$('.menu > button')
			.live('mouseover', function(event){
				var juiMenuButton = $(this);
				var juiMenuList = juiMenuButton.next();
				var juiNodeButton = juiMenuButton.parents('.path_elt').find('.path_button');
				
				if (juiMenuList.is(':visible')) return;
				
				juiMenuButton.button('option', 'icons', {secondary:'ui-icon-triangle-1-se'});
				juiNodeButton.trigger('mouseover_menu');
			})
			.live('mouseout', function(event){
				var juiMenuButton = $(this);
				var juiMenuList = juiMenuButton.next();
				var juiNodeButton = juiMenuButton.parents('.path_elt').find('.path_button');
				
				// don't do anything while selecting from menu list, i.e. keep the angle to 
				// "se" and keep the highlight of node button
				if (juiMenuList.is(':visible')) return;
				
				// normal mouseout or after selecting item from menulist (select menu event
				// triggers this mouseout explicitly)
				
				// adjust the triangle of the expand menu button
				juiMenuButton.button('option', 'icons', {secondary:'ui-icon-triangle-1-e'});
				
				// remove the highlight from the node button
				juiNodeButton.trigger('mouseout_menu');
			})
			.live('mouseover_button', function(event){
				$(this).removeClass('ui-state-default').addClass('ui-state-hover');
			})
			.live('mouseout_button', function(event){
				$(this).removeClass('ui-state-hover').addClass('ui-state-default');
			})
			;
		
		return {
			selector: '.path_menu',
			create: function(jqNode, level) {
				// becomes a true jui later on
				var juiMenuList =
					jqNode.find('> .child_node_ref_list')
						.clone()
						;
				
				// leaf => no expand menu => return empty jquery object
				if (!juiMenuList.length) return $();
				
				var juiMenuButton =
					$('<button class="path_menu">&nbsp;</button>') // need to put some text, though 'text:false' button option
						.button({
							text: false,
							icons: {
								secondary: 'ui-icon-triangle-1-e'
							}
						})
						;
								
				// dummy parent node, i.e. menu() uses prev() button internally to locate its button
				var jqMenu =
					$('<span class="menu"></span>')
						.append(juiMenuButton)
						.append(juiMenuList)
						;
						
				// the ul is in position now as next sibling of the button => jui it
				juiMenuList
					.menu({
						select: function(event, ui) {
							var juiMenuList = $(this);
							var juiMenuButton = juiMenuList.prev();
							var jqPath = juiMenuList.parents('.path');
							
							juiMenuList.popup('close');//hide();
							juiMenuButton.trigger('mouseout');
							
							jqPath
								.trigger('expand', [ui.item.attr('node_id'), level + 1])
								;
						}
					})
/*
					.popup({
//						options: {
						accept: function(a, b){alert('boe2');},
						activeClass: 'red'
//						}
					})
//					.option('accept', function(a, b){alert('boe');})
*/
					;
				
				return jqMenu;
			},
			destroy: function(jqMenus) {
				if (!jqMenus.length) return;
				
				// jui cleaning, also plural?, i.e. jqMenus.find('> button').button('destroy');});
				jqMenus.find('> button').each(function(){$(this).button('destroy');});
				jqMenus.find('> ul').each(function(){$(this).menu('destroy');});
				
				// dom cleaning
				jqMenus.remove();
			}
		}
	}
);
