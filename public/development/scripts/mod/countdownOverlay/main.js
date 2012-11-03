define(
	["mod/countdownOverlay/countdown", "mod/countdownOverlay/overlay"],
	function(modCountdown, modOverlay) {
		$(document).ready(function(){
			jqTriggers = modOverlay.getJqOverlayTriggers().filter(".countdown");
			jqTriggers.click(function(){
				var jqSelf=$(this);
				jqOverlay = $(jqSelf.attr("rel"));
				modCountdown.start(jqOverlay.find(" .countdown"))
			})
		})
	}
);
