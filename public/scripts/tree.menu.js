/*
 * 
 */

define(
	['jquery', 'jqueryui/menu', 'jqueryui/button', 'utils/jquery.debug'],
	
	function($) {
		$('.menu').on('click', function() {
			$('#menu').show();
		})
		
		$('#clickme').button();
		
		$('#menu').menu({
//			disabled: true,
			select: function(event, ui) {
//				$(ui.item).alert();
				$(this).hide();
			}
		}).hide();
	}
);
