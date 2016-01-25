
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

	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

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
						
						console.log("successful account");

						$("#loginPage").empty();
						alert("Account successfully created! Redirecting to options page");
						window.location.replace("/options/" + newVar);
					}
				}
			});

		});

	});

var peeps = [];
var animals = [];
var terrainType;
var rocks = [];
var trees = [];
var building = [];

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

$(".rainClick").click(function(){
	var holder = "";
	holder += "Rain, ";
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

$(".rockyClick").click(function(){
	var holder = "";
	holder += "Rocky, ";
	$("#optionsPage").append(holder);

	terrainType = 0;

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

$(".treesClick").click(function(){
	var holder = "";
	holder += "Trees, ";
	$("#optionsPage").append(holder);

	terrainType = 1;

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

$(".onecatClick").click(function(){
	var holder = "";
	holder += "One Cat, ";
	$("#optionsPage").append(holder);

	animals.push({
		"position": 10,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Jack",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
});

$(".twocatsClick").click(function(){
	var holder = "";
	holder += "Two Cats, ";
	$("#optionsPage").append(holder);

	animals.push({
		"position": 10,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Jack",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 11,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Jessica",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});

});

$(".threecatsClick").click(function(){
	var holder = "";
	holder += "Three Cats, ";
	$("#optionsPage").append(holder);

	animals.push({
		"position": 10,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Jack",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 11,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Jessica",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 12,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Matthew",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});

});

$(".fourcatsClick").click(function(){
	var holder = "";
	holder += "Four Cats, ";
	$("#optionsPage").append(holder);

	animals.push({
		"position": 10,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Jack",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 11,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Jessica",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 12,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Matthew",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 13,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Sara",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});

});

$(".fivecatsClick").click(function(){
	var holder = "";
	holder += "Five Cats, ";
	$("#optionsPage").append(holder);

	animals.push({
		"position": 10,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Jack",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 11,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Jessica",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 12,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Matthew",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 13,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Sara",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});

	animals.push({
		"position": 14,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"pathSpot": 6,
		"name": "Derek",
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
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

	buildings.push({
		"position": 125,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	peeps.push({
		"position": 30,
		"makePath": true,
		"moveType": 0,
		"home": 75,
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

	buildings.push({
		"position": 125,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 325,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	peeps.push({
		"position": 30,
		"makePath": true,
		"moveType": 0,
		"home": 75,
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
		"home": 275,
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

	buildings.push({
		"position": 125,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 325,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 525,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	peeps.push({
		"position": 30,
		"makePath": true,
		"moveType": 0,
		"home": 75,
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
		"home": 275,
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
		"home": 475,
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

	buildings.push({
		"position": 125,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 325,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 525,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 725,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	peeps.push({
		"position": 30,
		"makePath": true,
		"moveType": 0,
		"home": 75,
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
		"home": 275,
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
		"home": 475,
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
		"home": 675,
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

	buildings.push({
		"position": 125,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 325,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 525,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 725,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 925,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	peeps.push({
		"position": 30,
		"makePath": true,
		"moveType": 0,
		"home": 75,
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
		"home": 275,
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
		"home": 475,
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
		"home": 675,
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
		"home": 875,
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
	var tempPeeps = {
		type: "people",
		info: peeps
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(tempPeeps),
		contentType: "application/json",
	});

	var tempAnimals = {
		type: "animals",
		info: animals
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(tempAnimals),
		contentType: "application/json",
	});

	var tempBuildings = {
		type: "buildings",
		info: buildings
	}

	$.ajax({
		url: '/updateAccount/'+userID,
		type: 'POST',
		data: JSON.stringify(tempBuildings),
		contentType: "application/json",
	});

	if (terrainType === 0){
		rocks.push({
			"name": "rock1",
			"age": 0,
			"LnW": [
			2,
			2
			],
			"type": 0,
			"position": randomInt(50,2500)
		});

		rocks.push({
			"name": "rock2",
			"age": 0,
			"LnW": [
			2,
			2
			],
			"type": 0,
			"position": randomInt(50,2500)
		});

		rocks.push({
			"name": "rock3",
			"age": 0,
			"LnW": [
			2,
			2
			],
			"type": 0,
			"position": randomInt(50,2500)
		});

		rocks.push({
			"name": "rock4",
			"age": 0,
			"LnW": [
			2,
			2
			],
			"type": 0,
			"position": randomInt(50,2500)
		});


		var tempRocks = {
			type: "buildings",
			info: rocks
		}

		$.ajax({
			url: '/updateAccount/'+userID,
			type: 'POST',
			data: JSON.stringify(tempRocks),
			contentType: "application/json",
		});

	}

	else if (terrainType === 1){
		trees.push({
			"name": "tree1",
			"age": 0,
			"LnW": [
			4,
			4
			],
			"type": 1,
			"position": randomInt(50, 2500)
		});

		trees.push({
			"name": "tree2",
			"age": 0,
			"LnW": [
			4,
			4
			],
			"type": 1,
			"position": randomInt(50, 2500)
		});

		trees.push({
			"name": "tree3",
			"age": 0,
			"LnW": [
			4,
			4
			],
			"type": 1,
			"position": randomInt(50, 2500)
		});

		trees.push({
			"name": "tree4",
			"age": 0,
			"LnW": [
			4,
			4
			],
			"type": 1,
			"position": randomInt(50, 2500)
		});


		var tempTrees = {
			type: "buildings",
			info: trees
		}

		$.ajax({
			url: '/updateAccount/'+userID,
			type: 'POST',
			data: JSON.stringify(tempTrees),
			contentType: "application/json",
		});
	}

	window.location.replace("/village/" + userID);
});


});