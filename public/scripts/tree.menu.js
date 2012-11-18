/*
 * 
 */

require(
	['domReady!', 'jquery', 'jqueryui/menu', 'utils/jquery.debug'],
	
	function(doc, $) {
		$('#menu').menu({
			   select: function(event, ui) {
				   $(ui.item).alert();
			   }
		});
	}
);
