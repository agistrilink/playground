define([
        'jquery',
	 	'jqueryui/button',
	 	'jqueryui/position',
	 	'jqueryui/menu'
	],
	function($) {
		$(document).ready(function(){
			$('.path_favourites')
				.live('mouseover', function(event){
					$(this).addClass('ui-state-highlight');
				})
				.live('mouseout', function(event){
					$(this).removeClass('ui-state-highlight');
				})
				;
			
			$('.path_favourites > button').live('click', function(){
				var juiDropDownButton = $(this);
				
				juiDropDownButton.button('option', 'icons', {secondary:'ui-icon-triangle-1-s'});
		
				var juiMenu = juiDropDownButton.data('juiMenu');
	
				if (juiMenu.is(':visible')) {
					juiMenu.hide();
					return false;
				}
	
				juiMenu
					.menu('deactivate')
					.show()
					.css({top:0, left:0}) // no clue what this is doing, but it is in the 1.9m3 demo and harmless
					.position({ 
						my: 'left top',
						at: 'right bottom',
						of: this,
						offset: '-26 0' // fortunatly this works instead of the css above
					})
					;
	
				$(document).one('click', function() { // wherever clicked, hide the menu (only once)
					juiMenu.hide(); // hide first
			
					// kind of mouseout
					juiDropDownButton.button('option', 'icons', {secondary:'ui-icon-seek-prev'});
					juiDropDownButton.removeClass('ui-state-highlight');
				});
	
				return false;				
			});
		});
		
		return {
			create: function() {
				var juiDropDownButton = 
					$('<button>&nbsp;</button>') // need to put some text, though 'text:false' button option
						.button({
							text: false,
							icons: {
								secondary: 'ui-icon-star'
							},
							disabled: true
						})
						;

				var juiMenu = 
					$('<ul name="overflow"></ul>')
						.appendTo('#__tmp__')
						.menu({
							input: juiDropDownButton,
							select: function(event, ui) {
								juiMenu.hide();
								
							}
						})
						.hide()
						;
				
				juiDropDownButton.data('juiMenu', juiMenu);
				
				// surrounding span required for the 'blue' hovering button using ui-state-highlight
				return $('<span class="path_favourites" style="border:none"></span>').append(juiDropDownButton);
			},
			destroy: function(jqFavourites) {
				juiDropDownButton = jqFavourites.find('> button');
				
				juiDropDownButton.data('juiMenu')			
					.menu('destroy')
					.remove()
					;
				
				juiDropDownButton
					.button('destroy')
					.remove()
					;
				
				jqFavourites.remove();
			}
		}
	}
);
