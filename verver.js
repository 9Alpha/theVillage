

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
		return villageData.users[0].village;
	},
	update: function (ID) {
		for (var i = 0; i < villageData.users[0].village.creatures.people.length; i++) {
				villageData.users[0].village.creatures.people[i].position.x+=randomInt(-1, 1);
				villageData.users[0].village.creatures.people[i].position.y+=randomInt(-1, 1);
			}

		for (var i = 0; i < villageData.users[0].village.creatures.animals.length; i++) {
				villageData.users[0].village.creatures.animals[i].position.x+=randomInt(-1, 1);
				villageData.users[0].village.creatures.animals[i].position.y+=randomInt(-1, 1);
			}
	},
	writeToFile: function (ID) {
		fs.writeFileSync('./village.json', JSON.stringify(villageData, null, 4));
	}
}
