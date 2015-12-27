

var fs = require("fs");
var villageData = JSON.parse(fs.readFileSync("./village.json"));


function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	sendData: function () {
		return villageData;
	},
	update: function () {
		for (var i = 0; i < villageData.creatures.people.length; i++) {
				villageData.creatures.people[i].position.x+=randomInt(-1, 1);
				villageData.creatures.people[i].position.y+=randomInt(-1, 1);
			}

		for (var i = 0; i < villageData.creatures.animals.length; i++) {
				villageData.creatures.animals[i].position.x+=randomInt(-1, 1);
				villageData.creatures.animals[i].position.y+=randomInt(-1, 1);
			}
	},
	writeToFile: function () {
		fs.writeFileSync('./village.json', JSON.stringify(villageData));
	}
}
