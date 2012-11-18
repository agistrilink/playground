define([
        'jquery',
	 	'jqueryui/button',
	 	'jqueryui/position',
	 	'jqueryui/menu'
	],
	function($) {
		$('.path_overflow')
			.live('mouseover', function(event) {
				$(this).addClass('ui-state-highlight');
			})
			.live('mouseout', function(event) {
				$(this).removeClass('ui-state-highlight');
			})
			.live('push', function(event, jqElt) {
				var jqMenu = $(this);
				var juiMenuButton = jqMenu.find('> button');
				var juiMenuList = jqMenu.find('> ul');

				juiMenuButton.button('option', 'disabled', false);
				var htmlMenuListItemAnchor = '<a href="#">' + jqElt.find('.path_button').text() + '</a>';
				var htmlMenuListItemLi = '<li node_id="' + jqElt.attr('node_id') + '">' + htmlMenuListItemAnchor + '</li>';
				juiMenuList
					.append(htmlMenuListItemLi)
					.menu('refresh')
					;
			})
			.live('pop', function() {
				var jqMenu = $(this);
				var juiMenuButton = jqMenu.find('> button');
				var juiMenuList = jqMenu.find('> ul');
				
				juiMenuList.find('li:last').remove();
				
				if (!juiMenuList.children().length)
					juiMenuButton.button('disable');
			})
			;
	
		$('.path_overflow > button').live('click', function(){
			var juiMenuButton = $(this);
			var juiMenuList = juiMenuButton.next();
			
			juiMenuButton.button('option', 'icons', {secondary:'ui-icon-triangle-1-s'});

/*
			if (juiMenuList.is(':visible')) {
				juiMenuList.hide();
				return false;
			}
*/
			// this document.one is cool! but already inside popup();
			$(document).one('click', function() { // wherever clicked, hide the menu (only once)
				// kind of mouseout
				juiMenuButton.button('option', 'icons', {secondary:'ui-icon-seek-prev'});
				juiMenuButton.removeClass('ui-state-highlight');
			});

			return false;				
		});
		
		return {
			create: function() {
				var juiMenuButton = 
					$('<button>&nbsp;</button>') // need to put some text, though 'text:false' button option
						.button({
							text: false,
							icons: {
								secondary: 'ui-icon-seek-prev'
							},
							disabled: true
						})
						;
				
				// becomes a jui later on
				var juiMenuList = $('<ul name="overflow"></ul>');
				
				// menu parent node, i.e. menu() uses prev() button internally to locate its button
				// non-dummy, i.e. surrounding span required for the 'blue' hovering button using ui-state-highlight
				var jqMenu =
					$('<span class="path_overflow" style="border:none"></span>')
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
							juiMenuList.hide();
							
							// attr value quotes are mandatory nowadays (1.6.2) in jquery (vs 1.4.4)
							var selector = '[node_id="' + ui.item.attr('node_id') + '"]';
							jqPath
								.trigger('jump', [jqPath.children(selector)]);
								;
							
							// there is no ':gte'
							var index = juiMenuList.index(ui.item);
							selector = ':eq(' + index + '), :gt(' + index + ')';
							juiMenuList.children(selector).remove();
							juiMenuList.menu('refresh');

							if (juiMenuList.children().length == 0)
								juiMenuButton.button('disable');
						}
					})
					// not in 1.9.1 anymore grrrr
//					.popup()
					;
				
				juiMenuList.menu('collapse');
				
				alert('boe');
				
				return jqMenu;
			},
			destroy: function(jqOverflow) {
				juiDropDownButton = jqOverflow.find('> button');
				
				juiDropDownButton.data('juiMenu')			
					.menu('destroy')
					.remove()
					;
				
				juiDropDownButton
					.button('destroy')
					.remove()
					;
				
				jqOverflow.remove();				
			}
		}
	}
);
