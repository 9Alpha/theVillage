$drawSect = $('#drawHere');
var villageData;

var Width;
var count = 0;
var Height;
var serverHasData = false;
var rainArrX = [];
var rainArrY = [];

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function setup() {
	var myCanvas = createCanvas(1000, 1000);
	myCanvas.parent('drawHere');

	Width = width;
	Height = height;

	tree = loadImage("../public/pictures/Tree.png");
	rock = loadImage("../public/pictures/Rock.png");
	house = loadImage("../public/pictures/House.png");
	town_hall = loadImage("../public/pictures/Town_Hall.png");

	for (var i = 0; i < 500; i++) {
		rainArrX.push(0);
		rainArrY.push(0);
	}
}

function draw() {
	if (serverHasData) {
//console.log(userID);
$.getJSON('/vilData/'+userID)
.done(function(data){
	villageData = data;

	background(0, 200, 50);
/*
	if (count % 1 === 0) {
		for (var i = 0; i < width; i+=20) {
			for (var j = 0; j < height; j+=20){
				if (villageData.theGrid[(j/20)*(width/20)+(i/20)]) fill(255);
				else fill(0);
				rect(i, j, 20, 20);
				fill(0, 0, 255);
				textSize(8);
				text((j/20)*(width/20)+(i/20), i+10, j+10);
			}
		}
	}*/

	fill(0, 0);
	strokeWeight(5);
	rectMode(CORNER);
	rect(0, 0, width, height);
	rectMode(CENTER);
	

if (count % 1 === 0) {
	if (villageData.terrain.weather.current.type <= 0) {
		$('#weather_type').text("Rain");
		stroke(100, 50, 255);
		strokeWeight(2);
		console.log("raining");
		for (var i = 0; i < 500; i++) {
			rainArrX[i] = randomInt(0, 1000);
			rainArrY[i] = randomInt(0, 1000);
			line(rainArrX[i], rainArrY[i], rainArrX[i]+5, rainArrY[i]+5);
		}
	} else {
		$('#weather_type').text("Sun");
	}
}
//console.log(villageData.terrain.weather.current.type);
stroke(0);
strokeWeight(1);

	//console.log(villageData.terrain.weather.current.type);



for (var i = 0; i < villageData.creatures.people.length; i++) { //displaying people
	var pX, pY, pathX, pathY;
	fill(255);
	pX = (villageData.creatures.people[i].position % (width/20)) * 20;
	pY = (int)(villageData.creatures.people[i].position / (width/20)) * 20;
	ellipseMode(CENTER);
	rectMode(CENTER);
	push();
	translate(pX+10, pY+10);
	rotate(radians(villageData.creatures.people[i].direction*45+180));
	fill(0,100,255);
	rect(0, 0, 40, 10);
	fill(222,184,135);
	ellipse(0, 0, 15, 15);
	pop();
	if (mouseIsPressed === true && mouseX >= pX && mouseX <= pX+20 && mouseY >= pY && mouseY <= pY+20){
		villageData.creatures.people[i].selected = 1; 
		for (var j = 0; j < villageData.creatures.people.length; j++){
			if (j !== i){
				//villageData.creatures.people[j].selected = 0; 
			}
		}
	}

	if (villageData.creatures.people[i].selected === 1){
		stroke(0);
		fill(0,0);
		strokeWeight(3);
		ellipse(pX+10, pY+10, 50, 50);
		strokeWeight(1);
		$('#targetTitle').text("Person");
		$('#side_name').text(villageData.creatures.people[i].name);
		$('#side_person_type').text("Worker");
		$('#side_hunger').text(villageData.creatures.people[i].health.hunger);
		$('#side_happiness').text(villageData.creatures.people[i].health.happiness);

	}
}

for (var i = 0; i < villageData.creatures.animals.length; i++) { //displaying animals
	fill(100);
	strokeWeight(0);
	var aX, aY;
	aX = (villageData.creatures.animals[i].position % (width/20)) * 20;
	aY = (int)(villageData.creatures.animals[i].position / (width/20)) * 20;
	ellipseMode(CENTER);
	rectMode(CENTER);
	ellipseMode(CENTER);
	rectMode(CENTER);
	push();
	translate(aX+10, aY+10);
	rotate(radians(villageData.creatures.animals[i].direction*45+180));
	rect(0, 0, 10, 20);
	rect(0, -10, 5, 15);
	ellipse(0, 10, 15, 15);
	pop();

	if (mouseIsPressed === true && mouseX >= aX && mouseX <= aX+20 && mouseY >= aY && mouseY <= aY+20){
		villageData.creatures.animals[i].selected = 1; 
		for (var j = 0; j < villageData.creatures.animals.length; j++){
			if (j !== i){
				//villageData.creatures.animals[j].selected = 0; 
			}
		}
	}

	//console.log(villageData.creatures.animals[i].selected);

	if (villageData.creatures.animals[i].selected === 1){
		stroke(0);
		fill(0,0);
		strokeWeight(3);
		ellipse(aX+10, aY+10, 50, 50);
		strokeWeight(1);
		$('#targetTitle').text("Cat");
		$('#side_name').text(villageData.creatures.animals[i].name);
		$('#side_person_type').text("Animal");
		$('#side_hunger').text(villageData.creatures.animals[i].health.hunger);
		$('#side_happiness').text(villageData.creatures.animals[i].health.happiness);
	}
}

for (var i = 0; i < villageData.buildings.length; i++) { //displaying buildings
	noFill();
	rectMode(CORNER);
	stroke(0);
	fill(132,31,39);
	var bX, bY, bHid, bWit;
	bX = (villageData.buildings[i].position % (width/20)) * 20;
	bY = (int)(villageData.buildings[i].position / (width/20)) * 20;
	bWid = villageData.buildings[i].LnW[0] * 20;
	bHit = villageData.buildings[i].LnW[1] * 20;
	image(house, bX, bY, bWid, bHit);
}

for (var i = 0; i < villageData.terrain.objects.rocks.length; i++){ //displaying rocks
	fill(100);
	var rX, rY, rWid, rHit;
	rX = (villageData.terrain.objects.rocks[i].position % (width/20)) * 20; 
	rY = (int)(villageData.terrain.objects.rocks[i].position / (width/20)) * 20;
	rWid = villageData.terrain.objects.rocks[i].LnW[0] * 20;
	rHit = villageData.terrain.objects.rocks[i].LnW[1] * 20;
	image(rock, rX, rY, rWid, rHit);
}

for (var i = 0; i < villageData.terrain.objects.trees.length; i++){ //displaying trees
	var tX, tY, tWid, tHit;
	tX = (villageData.terrain.objects.trees[i].position % (width/20)) * 20; 
	tY = (int)(villageData.terrain.objects.trees[i].position / (width/20)) * 20;
	tWid = villageData.terrain.objects.trees[i].LnW[0] * 20;
	tHit = villageData.terrain.objects.trees[i].LnW[1] * 20;
	image(tree, tX, tY, tWid, tHit); 
}

for (var i = 0; i < villageData.terrain.objects.ponds.length; i++){ //displaying ponds
	fill(0,100,255);
	var pX, pY, pWid, pHit;
	pX = (villageData.terrain.objects.ponds[i].position % (width/20)) * 20; 
	pY = (int)(villageData.terrain.objects.ponds[i].position / (width/20)) * 20;
	pWid = villageData.terrain.objects.ponds[i].LnW[0] * 20;
	pHit = villageData.terrain.objects.ponds[i].LnW[1] * 20;
	ellipse(pX, pY, pWid, pHit, 20); 
	stroke(0);
}

$('#peepCount').text("Humans: "+villageData.creatures.people.length);
$('#catCount').text("Cats: "+villageData.creatures.animals.length);

});




count++;
}
}






$(window).on('load', function() {
	$.ajax ({
		type: "GET",
		url: "/vilInit",
		complete: function () {
			serverHasData = true;
		}
	});
	console.log("loaded");
});


$(window).on('unload', function() {
	$.ajax ({
		type: "POST",
		url: "/vilData/"+userID,
		complete: function () {
console.log("did stuff with ->"+userID);
}
});
	console.log("unloaded");
});




