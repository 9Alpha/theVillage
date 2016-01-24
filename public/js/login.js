
$(document).ready(function(){
	var mainHolder = "";
	mainHolder += "<h2> Selected Options:  </h2>";
	$("#optionsPage").append(mainHolder);

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
				if (data.responseText !== "false") {
					console.log("Logged In");
					window.location.replace("/village/" + data.responseText);
				}
				else if (data.responseText === "false"){
					alert("This is not a valid account!");
				}
			}
		});	
	});

	$(".makeAccount").click(function(){
		var holder = "";
		holder += "<form id = \"checkFields\">";
		holder += "<h2> Create an Account! </h2>";
		holder += "</br>";
		holder += "Make a Username!" + " <input type=\"text\" id=\"usernameAcc\" required>";
		holder += "</br>";
		holder += "</br>";
		holder += "Make a Password!" + " <input type=\"password\" id=\"passwordAcc\" required>";
		holder += "</br>";
		holder += "</br>";
		holder += "<input class=\"btn btn-primary\" type=\"submit\" id=\"createAccount\" value=\"Submit!\">";
		holder += "</form>";
		$("#loginPage").empty();
		$("#loginPage").append(holder);

		$("#checkFields").on('submit', function(e) {
			e.preventDefault();
			var newVar;
			var accInfo = {
				"info":[]
			};
			accInfo.info[0] = ($('#usernameAcc').val());
			accInfo.info[1] = ($('#passwordAcc').val());
			console.log(JSON.stringify(accInfo));
			$.ajax({
				url: '/makeLogin',
				type: 'PUT',
				data: JSON.stringify(accInfo),
				contentType: "application/json",
				complete: function(data) {
					console.log(data.responseText);
					if (data) {
						newVar = data.responseText;
						var temp = {
							type: "people",
							info: [{
								"position": 204,
								"direction": 45,
								"makePath": true,
								"moveType": 0,
								"pathArr": [
								],
								"pathSpot": 0,
								"age": 0,
								"activity": 0,
								"job": 0,
								"health": {
									"hunger": 0.84,
									"happiness": 0.94
								},
								"name": "Mark"
							}]
						}

						$.ajax({
							url: '/updateAccount/'+newVar,
							type: 'POST',
							data: JSON.stringify(temp),
							contentType: "application/json",
						});
						console.log("successful account");
					}
				}
			});
			$("#loginPage").empty();
			alert("Account successfully created! Redirecting to options page");
			window.location.replace("/options/" + newVar);
		});

});

$(".sunnyClick").click(function(){
	var holder = "";
	holder += "Sunny, ";
	$("#optionsPage").append(holder);

});

$(".cloudyClick").click(function(){
	var holder = "";
	holder += "Cloudy, ";
	$("#optionsPage").append(holder);

});

$(".rainClick").click(function(){
	var holder = "";
	holder += "Rain, ";
	$("#optionsPage").append(holder);

});

$(".snowyClick").click(function(){
	var holder = "";
	holder += "Snowy, ";
	$("#optionsPage").append(holder);

});

$(".rockyClick").click(function(){
	var holder = "";
	holder += "Rocky, ";
	$("#optionsPage").append(holder);

});

$(".sandyClick").click(function(){
	var holder = "";
	holder += "Sandy, ";
	$("#optionsPage").append(holder);

});

$(".treesClick").click(function(){
	var holder = "";
	holder += "Trees, ";
	$("#optionsPage").append(holder);

});

$(".mountainsClick").click(function(){
	var holder = "";
	holder += "Mountains, ";
	$("#optionsPage").append(holder);

});

$(".onewolfClick").click(function(){
	var holder = "";
	holder += "One Wolf, ";
	$("#optionsPage").append(holder);

});

$(".twowolvesClick").click(function(){
	var holder = "";
	holder += "Two Wolves, ";
	$("#optionsPage").append(holder);

});

$(".threewolvesClick").click(function(){
	var holder = "";
	holder += "Three Wolves, ";
	$("#optionsPage").append(holder);

});

$(".fourwolvesClick").click(function(){
	var holder = "";
	holder += "Four Wolves, ";
	$("#optionsPage").append(holder);

});

$(".fivewolvesClick").click(function(){
	var holder = "";
	holder += "Five Wolves, ";
	$("#optionsPage").append(holder);

});

$(".onecatClick").click(function(){
	var holder = "";
	holder += "One Cat, ";
	$("#optionsPage").append(holder);

});

$(".twocatsClick").click(function(){
	var holder = "";
	holder += "Two Cats, ";
	$("#optionsPage").append(holder);

});

$(".threecatsClick").click(function(){
	var holder = "";
	holder += "Three Cats, ";
	$("#optionsPage").append(holder);

});

$(".fourcatsClick").click(function(){
	var holder = "";
	holder += "Four Cats, ";
	$("#optionsPage").append(holder);

});

$(".fivecatsClick").click(function(){
	var holder = "";
	holder += "Five Cats, ";
	$("#optionsPage").append(holder);

});

$(".onechildClick").click(function(){
	var holder = "";
	holder += "One Child, ";
	$("#optionsPage").append(holder);

});

$(".twochildrenClick").click(function(){
	var holder = "";
	holder += "Two Children, ";
	$("#optionsPage").append(holder);

});


$(".threechildrenClick").click(function(){
	var holder = "";
	holder += "Three Children, ";
	$("#optionsPage").append(holder);

});


$(".fourchildrenClick").click(function(){
	var holder = "";
	holder += "Four Children, ";
	$("#optionsPage").append(holder);

});

$(".fivechildrenClick").click(function(){
	var holder = "";
	holder += "Five Children, ";
	$("#optionsPage").append(holder);

});

$(".fivechildrenClick").click(function(){
	var holder = "";
	holder += "Five Children, ";
	$("#optionsPage").append(holder);

});

$(".oneworkerClick").click(function(){
	var holder = "";
	holder += "One Worker ";
	$("#optionsPage").append(holder);

});

$(".twoworkersClick").click(function(){
	var holder = "";
	holder += "Two Workers ";
	$("#optionsPage").append(holder);

});

$(".threeworkersClick").click(function(){
	var holder = "";
	holder += "Three Workers ";
	$("#optionsPage").append(holder);

});

$(".fourworkersClick").click(function(){
	var holder = "";
	holder += "Four Workers ";
	$("#optionsPage").append(holder);

});


$(".fiveworkersClick").click(function(){
	var holder = "";
	holder += "Five Workers ";
	$("#optionsPage").append(holder);

});

$(".fiveworkersClick").click(function(){
	var holder = "";
	holder += "Five Workers ";
	$("#optionsPage").append(holder);

});

$(".createVillage").click(function(){
	alert("Options sucessfully inputed! Redirecting to village page");
});


});