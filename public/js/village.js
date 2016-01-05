$drawSect = $('#drawHere');
var villageData;

var Width;
var Height;


function setup() {
  var myCanvas = createCanvas($drawSect.width()-($drawSect.width()%20), $drawSect.height()-($drawSect.height()%20));
  myCanvas.parent('drawHere');

  Width = width;
  Height = height;
}

function draw() {
	$.getJSON('/vilData/'+0)
	.done(function(data){
		villageData = data;

		background(145, 35, 33);



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

