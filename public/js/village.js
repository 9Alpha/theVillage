$drawSect = $('#drawHere');
var villageData;


function setup() {
  var myCanvas = createCanvas($drawSect.width(), $drawSect.height());
  myCanvas.parent('drawHere');
}

function draw() {
	$.getJSON('/vilData')
	.done(function(data){
		villageData = data;

		for (var i = 0; i < villageData.creatures.people.length; i++) {
			fill(255);
			ellipse(villageData.creatures.people[i].position.x, villageData.creatures.people[i].position.y, 10, 10);
		}

		for (var i = 0; i < villageData.creatures.animals.length; i++) {
			fill(100);
			ellipse(villageData.creatures.animals[i].position.x, villageData.creatures.animals[i].position.y, 10, 10);
		}

		for (var i = 0; i < villageData.buildings.length; i++) {
			fill(50);
			rect(villageData.buildings[i].position.x, villageData.buildings[i].position.y, 40, 40);
		}
	});


}