

var fs = require("fs");
var villageData = JSON.parse(fs.readFileSync("./village.json"));


function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	sendData: function() {
		return villageData;
	},
	sendUser: function (ID) {
		return villageData.users[ID].village;
	},
	update: function (ID) {
		for (var i = 0; i < villageData.users[ID].village.creatures.people.length; i++) {
			villageData.users[ID].village.creatures.people[i].position.x+=randomInt(-1, 1);
			villageData.users[ID].village.creatures.people[i].position.y+=randomInt(-1, 1);
		}

		for (var i = 0; i < villageData.users[ID].village.creatures.animals.length; i++) {
			villageData.users[ID].village.creatures.animals[i].position.x+=randomInt(-1, 1);
			villageData.users[ID].village.creatures.animals[i].position.y+=randomInt(-1, 1);
		}

		updateGrid(ID);
	},
	writeToFile: function (ID) {
		fs.writeFileSync('./village.json', JSON.stringify(villageData, null, 4));
	}
}


path = function (x, y, stX, stY) {

}

updateGrid = function (ID) {
	for (var i = 0; i < villageData.users[ID].village.creatures.people.length; i++) {
		villageData.users[ID].village.theGrid[villageData.users[ID].village.creatures.people[i].position] = false;
	}
	for (var i = 0; i < villageData.users[ID].village.creatures.animals.length; i++) {
		villageData.users[ID].village.theGrid[villageData.users[ID].village.creatures.animals[i].position] = false;
	}
	for (var i = 0; i < villageData.users[ID].village.buildings.length; i++) {
		for (var j = 0; j < villageData.users[ID].village.buildings[0].LnW[0]-1; j++) {
			for (var k = 0; k < villageData.users[ID].village.buildings[0].LnW[1]-1; k++) {
				villageData.users[ID].village.theGrid[villageData.users[ID].village.buildings[i].position+j+(50*k)] = false;
			}
		}
	}
}

