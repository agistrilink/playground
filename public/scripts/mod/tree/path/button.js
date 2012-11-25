define([
        'jquery',
	 	'jqueryui/button'
	],
	function($) {
		// rename this to nodeButton - the name is better, i.e. path node makes more sense as path button
	
		// proposal 2: rename this to menu expand button + menu item list
	
		// http://jqueryui.com/docs/Theming/API
		var uiStateJoinedHover = 
			'ui-app-state-join-hover ui-widget-content'; // my favourite
//			'ui-app-state-join-hover ui-state-error';
//			'ui-app-state-join-hover ui-state-highlight';

		$('.path_button')
			.live('click', function() {
				jqElt = $(this).parents('.path_elt');
				jqPath = jqElt.parents('.path');
				jqPath.trigger('jump', [jqElt]);
			})
			.live('mouseover', function(event) { // implicit default hovering behaviour
				$(this).parents('.path_elt').find('.path_menu').trigger('mouseover_button');
			})
			.live('mouseout', function(event) { // implicit default hovering behaviour
				$(this).parents('.path_elt').find('.path_menu').trigger('mouseout_button');
			})
			.live('mouseover_menu', function(event) {
				var jqNodeButton = $(this);
				
				jqNodeButton
					.removeClass('ui-state-default')
					.removeClass('ui-state-hover')
					.addClass(uiStateJoinedHover)
					;
			})
			.live('mouseout_menu', function(event) {//alert('mouseout_menu');
				$(this).removeClass(uiStateJoinedHover).addClass('ui-state-default');
			})
			;
		
		return {
			selector: '.path_button',
			create: function(jqNode, level) {
				return $('<button class="path_button">' + jqNode.attr('name') + '</button>')
					.button()
					;
			},
			destroy: function(juiButtons) {
				if (!juiButtons.length) return;
				
				juiButtons.each(function(){$(this).button('destroy');});
				juiButtons.remove();
			}
		}
	}
);
