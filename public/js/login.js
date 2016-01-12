
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
		var holder = "";
		holder += "<form id = \"checkFields\">";
		holder += "<h2> Create an Account! </h2>"
		holder += "</br>";
		holder += "Make a Username!" + " <input type=\"text\" id=\"usernameAcc\" required>";
		holder += "</br>";
		holder += "</br>";
		holder += "Make a Password!" + " <input type=\"text\" id=\"passwordAcc\" required>";
		holder += "</br>";
		holder += "</br>";
		holder += "<input class=\"btn btn-primary\" type=\"submit\" id=\"createAccount\" value=\"Submit!\">";
		holder += "</form>";
		$("#loginPage").empty();
		$("#loginPage").append(holder);
		/*
		$("#loginPage").append("<form id = \"checkFields\">");
		$("#loginPage").append("<h2> Create an Account! </h2>");
		$("#loginPage").append("</br>");
		$("#loginPage").append("Make a Username!" + " <input type=\"text\" id=\"usernameAcc\" required>");
		$("#loginPage").append("</br>");
		$("#loginPage").append("</br>");
		$("#loginPage").append("Make a Password!" + " <input type=\"text\" id=\"passwordAcc\" required>");
		$("#loginPage").append("</br>");
		$("#loginPage").append("</br>");
		$("#loginPage").append("<input class=\"btn btn-primary\" type=\"submit\" id=\"createAccount\" value=\"Submit!\">");
		$("#loginPage").append("</form>");*/

		$("#checkFields").on('submit', function(e) {
			e.preventDefault();
			$("#loginPage").empty();
			window.location.replace("/options");
		});
	});

});