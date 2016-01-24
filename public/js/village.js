$drawSect = $('#drawHere');
var villageData;

var Width;
var count = 0;
var Height;
var serverHasData = false;


function setup() {
	var myCanvas = createCanvas(1000, 1000);
	myCanvas.parent('drawHere');


	Width = width;
	Height = height;
}

function draw() {
	if (serverHasData) {
//console.log(userID);
$.getJSON('/vilData/'+userID)
.done(function(data){
	villageData = data;

	background(145, 35, 33);

	fill(0, 0);
	strokeWeight(5);
	rect(0, 0, width, height);
	strokeWeight(1);


for (var i = 0; i < villageData.creatures.people.length; i++) { //displaying people
	var pX, pY, pathX, pathY;
	fill(255);
	pX = (villageData.creatures.people[i].position % (width/20)) * 20;
	pY = (int)(villageData.creatures.people[i].position / (width/20)) * 20;
	ellipseMode(CENTER);
	rectMode(CENTER);
	if (villageData.creatures.people[i].direction == 0 || villageData.creatures.people[i].direction == 2){
		rect(pX+10, pY+10, 40, 10);
	}
	else if (villageData.creatures.people[i].direction == 1 || villageData.creatures.people[i].direction == 3){
		rect(pX+10, pY+10, 10, 40);
	}
	ellipse(pX+10, pY+10, 15, 15);
}

for (var i = 0; i < villageData.creatures.animals.length; i++) { //displaying animals
	fill(100);
	var aX, aY;
	aX = (villageData.creatures.animals[i].position % (width/20)) * 20;
	aY = (int)(villageData.creatures.animals[i].position / (width/20)) * 20;
	ellipseMode(CENTER);
	rectMode(CENTER);
	rect(aX+10, aY+10, 10, 30);
	ellipse(aX+10, aY+10, 15, 15);
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
	rect(bX, bY, bWid, bHit, 20);
	stroke(0);
}

for (var i = 0; i < villageData.terrain.objects.rocks.length; i++){ //displaying rocks
	fill(100);
	var rX, rY, rWid, rHit;
	rX = (villageData.terrain.objects.rocks[i].position % (width/20)) * 20; 
	rY = (int)(villageData.terrain.objects.rocks[i].position / (width/20)) * 20;
	rWid = villageData.terrain.objects.rocks[i].LnW[0] * 20;
	rHit = villageData.terrain.objects.rocks[i].LnW[1] * 20;
	rect(rX, rY, rWid, rHit, 20); 
	stroke(0);
}

for (var i = 0; i < villageData.terrain.objects.trees.length; i++){ //displaying trees
	var tX, tY, tWid, tHit;
	tX = (villageData.terrain.objects.trees[i].position % (width/20)) * 20; 
	tY = (int)(villageData.terrain.objects.trees[i].position / (width/20)) * 20;
	tWid = villageData.terrain.objects.trees[i].LnW[0] * 20;
	tHit = villageData.terrain.objects.trees[i].LnW[1] * 20;
	fill(210, 180, 140);
	rect(tX, tY, tWid/2, tHit, 20); 
	fill(34, 139, 34);
	ellipse(tX, tY, tWid, tHit/2, 20);
	stroke(0);
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
		url: "/vilData/"+0,
		complete: function () {
//window.onbeforeunload = function() {
// return 'Hold up';
//}
}
});
	console.log("unloaded");
});