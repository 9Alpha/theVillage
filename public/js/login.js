
$(document).ready(function(){
	var mainHolder = "";
	var newVar;

	var names = ["MARY","PATRICIA","LINDA","BARBARA","ELIZABETH","JENNIFER","MARIA","SUSAN","MARGARET","DOROTHY","LISA","NANCY","KAREN","BETTY","HELEN","SANDRA","DONNA","CAROL","RUTH","SHARON","MICHELLE","LAURA","SARAH","KIMBERLY","DEBORAH","JESSICA","SHIRLEY","CYNTHIA","ANGELA","MELISSA","BRENDA","AMY","ANNA","REBECCA","VIRGINIA","KATHLEEN","PAMELA","MARTHA","DEBRA","AMANDA","STEPHANIE","CAROLYN","CHRISTINE","MARIE","JANET","CATHERINE","FRANCES","ANN","JOYCE","DIANE","ALICE","JULIE","HEATHER","TERESA","DORIS","GLORIA","EVELYN","JEAN","CHERYL","MILDRED","KATHERINE","JOAN","ASHLEY","JUDITH","ROSE","JANICE","KELLY","NICOLE","JUDY","CHRISTINA","KATHY","THERESA","BEVERLY","DENISE","TAMMY","IRENE","JANE","LORI","RACHEL","MARILYN","ANDREA","KATHRYN","LOUISE","SARA","ANNE","JACQUELINE","WANDA","BONNIE","JULIA","RUBY","LOIS","TINA","PHYLLIS","NORMA","PAULA","DIANA","ANNIE","LILLIAN","EMILY","ROBIN","PEGGY","CRYSTAL","GLADYS","RITA","DAWN","CONNIE","FLORENCE","TRACY","EDNA","TIFFANY","CARMEN","ROSA","CINDY","GRACE","WENDY","VICTORIA","EDITH","KIM","SHERRY","SYLVIA","JOSEPHINE","THELMA","SHANNON","SHEILA","ETHEL","ELLEN","ELAINE","MARJORIE","CARRIE","CHARLOTTE","MONICA","ESTHER","PAULINE","EMMA","JUANITA","ANITA","RHONDA","HAZEL","AMBER","EVA","DEBBIE","APRIL","LESLIE","CLARA","LUCILLE","JAMIE","JOANNE","ELEANOR","VALERIE","DANIELLE","MEGAN","ALICIA","SUZANNE","MICHELE","GAIL","BERTHA","DARLENE","VERONICA","JILL","ERIN","GERALDINE","LAUREN","CATHY","JOANN","LORRAINE","LYNN","SALLY","REGINA","ERICA","BEATRICE","DOLORES","BERNICE","AUDREY","YVONNE","ANNETTE","JUNE","SAMANTHA","MARION","DANA","STACY","ANA","RENEE","IDA","VIVIAN","ROBERTA","HOLLY","BRITTANY","MELANIE","LORETTA","YOLANDA","JEANETTE","LAURIE","KATIE","KRISTEN","VANESSA","ALMA","SUE","ELSIE","BETH","JEANNE","VICKI","CARLA","TARA","ROSEMARY","EILEEN","TERRI","GERTRUDE","LUCY","TONYA","ELLA","STACEY","WILMA","GINA","KRISTIN","JESSIE","NATALIE","AGNES","VERA","WILLIE","CHARLENE","BESSIE","DELORES","MELINDA","PEARL","ARLENE","MAUREEN","COLLEEN","ALLISON","TAMARA","JOY","GEORGIA","CONSTANCE","LILLIE","CLAUDIA","JACKIE","MARCIA","TANYA","NELLIE","MINNIE","MARLENE","HEIDI","GLENDA","LYDIA","VIOLA","COURTNEY","MARIAN","STELLA","CAROLINE","DORA","JO","VICKIE","MATTIE","TERRY","MAXINE","IRMA","MABEL","MARSHA","MYRTLE","LENA","CHRISTY","DEANNA","PATSY","HILDA","GWENDOLYN","JENNIE","NORA","MARGIE","NINA","CASSANDRA","LEAH","PENNY","KAY","PRISCILLA","NAOMI","CAROLE","BRANDY","OLGA","BILLIE","DIANNE","TRACEY","LEONA"];
	var namLen = names.length;

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
var terrainType = 0;
var rocks = [];
var trees = [];
var buildings = [];

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
		contentType: "application/json"
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
		contentType: "application/json"
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
		"position": 60,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
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
		"position": 60,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 61,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
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
		"position": 60,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 61,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 62,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
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
		"position": 60,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 61,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 62,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 63,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
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
		"position": 60,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 61,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 62,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});
	animals.push({
		"position": 63,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
	});

	animals.push({
		"position": 64,
		"direction": 270,
		"makePath": false,
		"moveType": 0,
		"pathArr": [],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 6,
		"name": names[randomInt(0, namLen)],
		"age": 0,
		"type": 0,
		"health": {
			"hunger": 1,
			"happiness": 1
		}
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
		"position": 80,
		"makePath": true,
		"moveType": 0,
		"home": 75,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
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
		"position": 340,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	peeps.push({
		"position": 80,
		"makePath": true,
		"moveType": 0,
		"home": 75,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
	});
	peeps.push({
		"position": 81,
		"makePath": true,
		"moveType": 0,
		"home": 290,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
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
		"position": 340,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 510,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	peeps.push({
		"position": 80,
		"makePath": true,
		"moveType": 0,
		"home": 75,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
	});
	peeps.push({
		"position": 81,
		"makePath": true,
		"moveType": 0,
		"home": 290,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
	});
	peeps.push({
		"position": 82,
		"makePath": true,
		"moveType": 0,
		"home": 460,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
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
		"position": 340,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 510,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 1235,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	peeps.push({
		"position": 80,
		"makePath": true,
		"moveType": 0,
		"home": 75,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
	});
	peeps.push({
		"position": 81,
		"makePath": true,
		"moveType": 0,
		"home": 290,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
	});
	peeps.push({
		"position": 82,
		"makePath": true,
		"moveType": 0,
		"home": 460,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
	});
	peeps.push({
		"position": 83,
		"makePath": true,
		"moveType": 0,
		"home": 1285,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
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
		"position": 340,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 510,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 1235,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	buildings.push({
		"position": 2307,
		"LnW": [
		3,
		6
		],
		"name": "House",
		"age": 0,
		"type": 0
	});

	peeps.push({
		"position": 80,
		"makePath": true,
		"moveType": 0,
		"home": 75,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
	});
	peeps.push({
		"position": 81,
		"makePath": true,
		"moveType": 0,
		"home": 290,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
	});
	peeps.push({
		"position": 82,
		"makePath": true,
		"moveType": 0,
		"home": 460,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
	});
	peeps.push({
		"position": 83,
		"makePath": true,
		"moveType": 0,
		"home": 1185,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
	});
	peeps.push({
		"position": 84,
		"makePath": true,
		"moveType": 0,
		"home": 2257,
		"pathArr": [
		],
		"dirArr": [],
		"selected": 0,
		"pathSpot": 0,
		"age": 0,
		"activity": 0,
		"job": 1,
		"health": {
			"hunger": 1,
			"happiness": 1
		},
		"name": names[randomInt(0, namLen)]
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
		complete: function(data) {
			var tempAnimals = {
				type: "animals",
				info: animals
			}

			$.ajax({
				url: '/updateAccount/'+userID,
				type: 'POST',
				data: JSON.stringify(tempAnimals),
				contentType: "application/json",
				complete: function(data) {
					var tempBuildings = {
						type: "buildings",
						info: buildings
					}

					$.ajax({
						url: '/updateAccount/'+userID,
						type: 'POST',
						data: JSON.stringify(tempBuildings),
						contentType: "application/json",
						complete: function(data) {
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
									type: "rocks",
									info: rocks
								}

								$.ajax({
									url: '/updateAccount/'+userID,
									type: 'POST',
									data: JSON.stringify(tempRocks),
									contentType: "application/json",
									complete: function(data) {
										window.location.replace("/village/" + userID);
									}
								});

							}

							else {
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
									type: "trees",
									info: trees
								}

								$.ajax({
									url: '/updateAccount/'+userID,
									type: 'POST',
									data: JSON.stringify(tempTrees),
									contentType: "application/json",
									complete: function(data) {
										window.location.replace("/village/" + userID);
									}
								});
							}
						}
					});
}
});
}
});





});


});