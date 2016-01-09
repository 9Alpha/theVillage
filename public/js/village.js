$drawSect = $('#drawHere');
var villageData;

var Width;
var count = 0;
var Height;


function setup() {
	var myCanvas = createCanvas(1000, 1000);
	myCanvas.parent('drawHere');


	Width = width;
	Height = height;
}

function draw() {
	$.getJSON('/vilData/'+0)
	.done(function(data){
		villageData = data;

		//background(145, 35, 33);
		if (count % 30 === 0) {
			for (var i = 0; i < width; i+=20) {
				for (var j = 0; j < height; j+=20){
					if (villageData.theGrid[(j/20)*(width/20)+(i/20)]) fill(255);
					else fill(0);
					rect(i, j, 20, 20);
				}
			}
		}

		for (var i = 0; i < villageData.creatures.people.length; i++) {
			fill(255);
			var pX, pY;
			pX = (villageData.creatures.people[i].position % (width/20)) * 20;
			pY = (int)(villageData.creatures.people[i].position / (width/20)) * 20;
			ellipse(pX+10, pY+10, 15, 15);
		}

		for (var i = 0; i < villageData.creatures.animals.length; i++) {
			fill(100);
			var aX, aY;
			aX = (villageData.creatures.animals[i].position % (width/20)) * 20;
			aY = (int)(villageData.creatures.animals[i].position / (width/20)) * 20;
			ellipse(aX+10, aY+10, 15, 15);
		}

		for (var i = 0; i < villageData.buildings.length; i++) {
			//fill(50);
			noFill();
			stroke(0, 255, 0);
			var bX, bY, bHid, bWit;
			bX = (villageData.buildings[i].position % (width/20)) * 20;
			bY = (int)(villageData.buildings[i].position / (width/20)) * 20;
			bWid = villageData.buildings[i].LnW[0] * 20;
			bHit = villageData.buildings[i].LnW[1] * 20;
			rect(bX, bY, bWid, bHit, 20);
			stroke(0);
		}
	});

count++;
}



window.onbeforeunload = function() {
	return 'Hold up';
}


$(window).on('unload', function() {
	$.ajax ({
		type: "PUT",
		url: "/vilData/"+0,
		complete: function () {
			window.onbeforeunload = function() {
				return 'Hold up';
			}		
		}
	});
	console.log("unloaded");
});

