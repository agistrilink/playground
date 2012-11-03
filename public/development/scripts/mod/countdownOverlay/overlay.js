define(
	["mod/countdownOverlay/buttons", "req/jquery/tools/tiny/import"],
	function(){
		var jqOverlayTriggers;
		
		$(document).ready(function(){
			jqOverlayTriggers = $("[rel]");
			jqOverlayTriggers.overlay()
		});
		
		return {
			getJqOverlayTriggers:function(){return jqOverlayTriggers}
		}
	}
);
