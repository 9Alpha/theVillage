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
		$.getJSON('/vilData/0')
		.done(function(data){
			villageData = data;

			background(145, 35, 33);

			fill(0, 0);
			strokeWeight(5);
			rect(0, 0, width, height);
			strokeWeight(1);

	/*if (count % 1 === 0) {
		for (var i = 0; i < width; i+=20) {
			for (var j = 0; j < height; j+=20){
				if (villageData.theGrid[(j/20)*(width/20)+(i/20)]) fill(255);
				else fill(0);
				rect(i, j, 20, 20);
			}
		}
	}*/
	
	for (var i = 0; i < villageData.creatures.people.length; i++) { //displaying people
		var pX, pY, pathX, pathY;
		/*fill(0, 50*i, 255);
		for (var j = 0; j < villageData.creatures.people[i].pathArr.length; j++) {
			pathX = (villageData.creatures.people[i].pathArr[j] % (width/20)) * 20;
			pathY = (int)(villageData.creatures.people[i].pathArr[j] / (width/20)) * 20;
			if (j === villageData.creatures.people[i].pathArr.length-1) {
				fill(200, 200, 10);
			}
			rect(pathX+10, pathY+10, 10, 10);
		}*/
		fill(255);
		pX = (villageData.creatures.people[i].position % (width/20)) * 20;
		pY = (int)(villageData.creatures.people[i].position / (width/20)) * 20;
		ellipseMode(CENTER);
		rectMode(CENTER);
		rect(pX+10, pY+10, 40, 10);
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
		//fill(50);
		noFill();
		rectMode(CORNER);
		stroke(0, 255, 0);
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
		rect(tX, tY, tWid, tHit/2, 20); 
		fill(34, 139, 34);
		ellipse(tX, tY, tWid, tHit/2, 20);
		stroke(0);
	}

});

count++;
}
}



window.onbeforeunload = function() {
	return 'Hold up';
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
			window.onbeforeunload = function() {
				return 'Hold up';
			}
		}
	});
	console.log("unloaded");
});