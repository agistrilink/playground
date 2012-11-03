define(
	["req/jquery/countdown/import"],
	function() {
		return {
			start: function(jqSelector) {
				jqSelector.countdown({
					until: 3600,
					compact: true,
					onExpiry: function(){alert("timeout")}
				})
			}
		}
	}
);
