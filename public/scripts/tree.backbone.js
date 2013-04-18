/*
 * 
 */

define([
        'jquery',
        'mod/user',
        'utils/jquery.debug'
	],
	function(jQuery, User) {
	
	
	
return {
	run: function() {

		
		
		alert('bb no syntax error');

		var user = User.newInstance('harrold korte');
		
		alert(user.url());
		
		var mimeTypeJson = function(xhr){
			xhr.overrideMimeType("application/json; charset=utf-8");			
		}
		user.on("change", function() {
			alert(JSON.stringify(this));
		});	
		user.fetch({
			beforeSend: mimeTypeJson
		}).done(function () {
//			alert(JSON.stringify(user));
		});
		
		alert('done');
		
//		alert(JSON.stringify(user));

/*
		$.get(user.url(), function (rsp){
			alert(rsp);
		});
*/
		
		
/*		
		user.fetch({
			success: function (user) {
				alert(user.toJSON());
			},
			error: function(user) {
				alert('error: ' + user);
			}
		});

//		_.each([1, 2, 3], function(num){ alert(num); });

//		['one', 'two', 'three'].each(alert);
*/
		
		
		
		
	}
}





	}
);
