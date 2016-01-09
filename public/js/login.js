
$(document).ready(function(){
	$('#login').on('submit', function(e) {
		e.preventDefault();
		var temp = {
			"info": []
		};
		temp.info[0] = ($('#username').val());
		temp.info[1] = ($('#pass').val());
		console.log(JSON.stringify(temp));
		$.ajax({
			url: '/checkLogin',
			type: 'POST',
			data: JSON.stringify(temp),
			contentType: "application/json",
			complete: function(data) {
				console.log(data.responseText);
				if (data) {
					console.log("did it");
				}
			}
		});
		window.location.replace("/options");
	});

	$(".makeAccount").click(function(){
		$("#loginPage").empty();
		$("#loginPage").append("<h2> Create an Account! </h2>");
		$("#loginPage").append("</br>");
		$("#loginPage").append("Make a Username!" + " <input type=\"text\" id=\"usernameAcc\">");
		$("#loginPage").append("</br>");
		$("#loginPage").append("</br>");
		$("#loginPage").append("Make a Password!" + " <input type=\"text\" id=\"passwordAcc\">");
		$("#loginPage").append("</br>");
		$("#loginPage").append("</br>");
		$("#loginPage").append("<button class=\"btn btn-primary returntoLogin\"> Submit! </button>");

		$(".returntoLogin").click(function(){
			$("#loginPage").empty();
			window.location.replace("/options");
		});
	});

});