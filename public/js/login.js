
$(document).ready(function(){
	var mainHolder = "";
	var newVar;
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
							url: '/updateAccount/'+ newVar,
							type: 'POST',
							data: JSON.stringify(temp),
							contentType: "application/json",
						});
						console.log("successful account");

						$("#loginPage").empty();
						//change
						alert("Account successfully created! Redirecting to options page");
						window.location.replace("/options/" + newVar);
					}
				}
			});

});

});

var peeps = [];

$(".sunnyClick").click(function(){
	var holder = "";
	holder += "Sunny, ";
	$("#optionsPage").append(holder);
	var temp = {
		type: "weather",
		info: 0
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});
});

$(".cloudyClick").click(function(){
	var holder = "";
	holder += "Cloudy, ";
	$("#optionsPage").append(holder);
	var temp = {
		type: "weather",
		info: 1
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});

});

$(".rainClick").click(function(){
	var holder = "";
	holder += "Rain, ";
	$("#optionsPage").append(holder);

	var temp = {
		type: "weather",
		info: 2
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});

});

$(".snowyClick").click(function(){
	var holder = "";
	holder += "Snowy, ";
	$("#optionsPage").append(holder);

	var temp = {
		type: "weather",
		info: 3
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});

});

$(".rockyClick").click(function(){
	var holder = "";
	holder += "Rocky, ";
	$("#optionsPage").append(holder);

	var temp = {
		type: "terrain",
		info: 0
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});

});

$(".sandyClick").click(function(){
	var holder = "";
	holder += "Sandy, ";
	$("#optionsPage").append(holder);

	var temp = {
		type: "terrain",
		info: 1
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});

});

$(".treesClick").click(function(){
	var holder = "";
	holder += "Trees, ";
	$("#optionsPage").append(holder);

	var temp = {
		type: "terrain",
		info: 2
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});

});

$(".mountainsClick").click(function(){
	var holder = "";
	holder += "Mountains, ";
	$("#optionsPage").append(holder);

	var temp = {
		type: "terrain",
		info: 3
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});

});

$(".onecatClick").click(function(){
	var holder = "";
	holder += "One Cat, ";
	$("#optionsPage").append(holder);

	var temp = {
		type: "cat",
		info: 0
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});

});

$(".twocatsClick").click(function(){
	var holder = "";
	holder += "Two Cats, ";
	$("#optionsPage").append(holder);

	var temp = {
		type: "cat",
		info: 1
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});

});

$(".threecatsClick").click(function(){
	var holder = "";
	holder += "Three Cats, ";
	$("#optionsPage").append(holder);

	var temp = {
		type: "cat",
		info: 2
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});

});

$(".fourcatsClick").click(function(){
	var holder = "";
	holder += "Four Cats, ";
	$("#optionsPage").append(holder);

	var temp = {
		type: "cat",
		info: 3
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});

});

$(".fivecatsClick").click(function(){
	var holder = "";
	holder += "Five Cats, ";
	$("#optionsPage").append(holder);

	var temp = {
		type: "cat",
		info: 4
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});

});

$(".onechildClick").click(function(){
	var holder = "";
	holder += "One Child, ";
	$("#optionsPage").append(holder);


		peeps.push({
			"position": 20,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Mark"
		});


});

$(".twochildrenClick").click(function(){
	var holder = "";
	holder += "Two Children, ";
	$("#optionsPage").append(holder);

	peeps.push({
			"position": 20,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Mark"
		});
	peeps.push({
			"position": 21,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Alexandra"
		});
});


$(".threechildrenClick").click(function(){
	var holder = "";
	holder += "Three Children, ";
	$("#optionsPage").append(holder);

	peeps.push({
			"position": 20,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Mark"
		});
	peeps.push({
			"position": 21,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Alexandra"
		});
	peeps.push({
			"position": 22,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "David"
		});
});


$(".fourchildrenClick").click(function(){
	var holder = "";
	holder += "Four Children, ";
	$("#optionsPage").append(holder);

	peeps.push({
			"position": 20,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Mark"
		});
	peeps.push({
			"position": 21,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Alexandra"
		});
	peeps.push({
			"position": 22,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "David"
		});
	peeps.push({
			"position": 23,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Alison"
		});
});

$(".fivechildrenClick").click(function(){
	var holder = "";
	holder += "Five Children, ";
	$("#optionsPage").append(holder);

	peeps.push({
			"position": 20,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Mark"
		});
	peeps.push({
			"position": 21,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Alexandra"
		});
	peeps.push({
			"position": 22,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "David"
		});
	peeps.push({
			"position": 23,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Alison"
		});
	peeps.push({
			"position": 24,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 0,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "James"
		});
});

$(".oneworkerClick").click(function(){
	var holder = "";
	holder += "One Worker ";
	$("#optionsPage").append(holder);

	peeps.push({
			"position": 30,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Timothy"
		});
});

$(".twoworkersClick").click(function(){
	var holder = "";
	holder += "Two Workers ";
	$("#optionsPage").append(holder);

	peeps.push({
			"position": 30,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Timothy"
		});
	peeps.push({
			"position": 31,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Rebecca"
		});

});

$(".threeworkersClick").click(function(){
	var holder = "";
	holder += "Three Workers ";
	$("#optionsPage").append(holder);

	peeps.push({
			"position": 30,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Timothy"
		});
	peeps.push({
			"position": 31,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Rebecca"
		});
	peeps.push({
			"position": 32,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Samuel"
		});
	
});

$(".fourworkersClick").click(function(){
	var holder = "";
	holder += "Four Workers ";
	$("#optionsPage").append(holder);

	peeps.push({
			"position": 30,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Timothy"
		});
	peeps.push({
			"position": 31,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Rebecca"
		});
	peeps.push({
			"position": 32,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Samuel"
		});
	peeps.push({
			"position": 33,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Samantha"
		});

});


$(".fiveworkersClick").click(function(){
	var holder = "";
	holder += "Five Workers ";
	$("#optionsPage").append(holder);

	peeps.push({
			"position": 30,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Timothy"
		});
	peeps.push({
			"position": 31,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Rebecca"
		});
	peeps.push({
			"position": 32,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Samuel"
		});
	peeps.push({
			"position": 33,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Samantha"
		});
	peeps.push({
			"position": 34,
			"makePath": true,
			"moveType": 0,
			"pathArr": [
			],
			"dirArr": [],
			"pathSpot": 0,
			"age": 0,
			"activity": 0,
			"job": 1,
			"health": {
				"hunger": 1,
				"happiness": 1
			},
			"name": "Justin"
		});
});

$(".createVillage").click(function(){
	alert("Options sucessfully inputed! Redirecting to village page");
	var temp = {
		type: "people",
		info: peeps
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
	});
	window.location.replace("/village/" + userID);
});


});