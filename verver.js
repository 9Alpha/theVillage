var fs = require("fs");
var villageData;
var falsed = [];
var timeA = 0;
var timeB = 0;
var timeDif = 0;
var HValueArr = [];
var activities = ['going', 'meandering', 'standing', 'eating']; 
var lastNode = 0;
var arrForParents = [];
var dirArr = [];
var count = 0;


function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcHValue(toSpot, ID) {
	var temp = 0;
	for (var i = 0; i < villageData[ID].village.theGrid.length; i++) {
		temp+=Math.abs(((toSpot%50)-(i%50)));
		temp+=Math.abs(parseInt(toSpot/50)-parseInt(i/50));

		HValueArr.push(temp);
		temp = 0;
	}
}

function findIndex(arr, data) {
	var index;

	for (var i = 0; i < arr.length; i++) {
		if (arr[i].data.id === data) {
			index = i;
		}
	}

	return index;
}

function Node(A, B, id, dir, check) {
	var C = A * B;
	this.data = {"id": id, "H": A, "G": B, "F": C, "dir":dir, "check": check};
	this.parent = null;
	this.children = [];
}

function AStarTree(A, B, id, dir, check) {
	var node = new Node(A, B, id, dir, check);
	this._root = node;
}

AStarTree.prototype.traverseDF = function(callback) {

    // this is a recurse and immediately-invoking function 
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }

        // step 4
        callback(currentNode);

        // step 1
    })(this._root);

};

AStarTree.prototype.traverseBF = function(callback) {
	var queue = [];

	queue.enqueue(this._root);

	currentTree = queue.dequeue();

	while(currentTree){
		for (var i = 0, length = currentTree.children.length; i < length; i++) {
			queue.enqueue(currentTree.children[i]);
		}

		callback(currentTree);
		currentTree = queue.dequeue();
	}
};

AStarTree.prototype.contains = function(callback, traversal) {
	traversal.call(this, callback);
};

AStarTree.prototype.add = function(A, B, id, dir, check, toData, traversal) {
	var child = new Node(A, B, id, dir, check),
	parent = null,
	callback = function(node) {
		if (node.data.id === toData) {
			parent = node;
		}
	};

	this.contains(callback, traversal);

	if (parent) {
		parent.children.push(child);
		child.parent = parent;
	} else {
		console.log('Cannot add node to a non-existent parent.  Parent--> '+toData);
	}
};

AStarTree.prototype.remove = function(id, fromData, traversal) {
	var tree = this,
	parent = null,
	childToRemove = null,
	index;

	var callback = function(node) {
		if (node.data.id === fromData) {
			parent = node;
		}
	};

	this.contains(callback, traversal);

	if (parent) {
		index = findIndex(parent.children, id);

		if (index === undefined) {
			console.log('Node to remove does not exist.');
		} else {
			childToRemove = parent.children.splice(index, 1);
		}
	} else {
		console.log('Parent does not exist.');
	}

	return childToRemove;
};


















module.exports = {
	getData: function(data) {
		villageData = data;
		console.log("Data received");
	},
	getUserArr: function() {
		var temp = "{";
		for (var i = 0; i < villageData.length; i++) {
			temp+="\""+villageData[i].userID+"\": "+i;
			if (i !== villageData.length-1) {
				temp+=",";
			}
		}
		temp+="}";
		return temp;

	},
	gridInit: function(ID) {
		var temp = [];
		for (var i = 0; i < 2500; i++) {
			if (i % 50 === 0 || i % 50 === 49 || i < 50 || i > 2449) {
				temp.push(false);
			} else {
				temp.push(true);
			}
		}
		return temp;
	},
	sendData: function() {
		return villageData;
	},
	sendData: function(ID) {
		return villageData[ID];
	},
	sendUser: function (ID) {
		count++;
		return villageData[ID].village;
	},
	update: function (ID) {
		//console.log("ververStart");
		updateGrid(ID);

		for (var i = 0; i < villageData[ID].village.creatures.people.length; i++) {


			if (villageData[ID].village.creatures.people[i].position === villageData[ID].village.creatures.people[i].home) {
				villageData[ID].village.creatures.people[i].health.hunger = 1;
			} else {
				villageData[ID].village.creatures.people[i].health.hunger-=(randomInt(3, 8)/10000);
			}

			var weatherMod = randomInt(-villageData[ID].village.terrain.weather.options.rain_chance, villageData[ID].village.terrain.weather.options.sun_chance);

			if (weatherMod < 0) {
				villageData[ID].village.terrain.weather.current.type--;
			} else {
				villageData[ID].village.terrain.weather.current.type++;
			}

			if (villageData[ID].village.creatures.people[i].health.hunger <= .3) {
				villageData[ID].village.creatures.people[i].activity = 2;
			} else {
				villageData[ID].village.creatures.people[i].activity = 1;
			}

			if (villageData[ID].village.creatures.people[i].makePath) {
				if (villageData[ID].village.creatures.people[i].moveType === 0) {
					pathPerson(villageData[ID].village.creatures.people[i].position, 0, false, i, ID);
				}
				else if (villageData[ID].village.creatures.people[i].moveType === 1) {
					if (villageData[ID].village.creatures.people[i].activity === 2) {
						console.log(villageData[ID].village.creatures.people[i].home+"<- home");
						if (villageData[ID].village.theGrid[villageData[ID].village.creatures.people[i].home]) {
							pathPerson(villageData[ID].village.creatures.people[i].position, villageData[ID].village.creatures.people[i].home, true, i, ID);
						} else {
							villageData[ID].village.creatures.people[i].activity = 1;
						}
					} else if (villageData[ID].village.creatures.people[i].activity === 1) {
						pathPerson(villageData[ID].village.creatures.people[i].position, 0, false, i, ID);
					}
				}
			}

			if (villageData[ID].village.creatures.people[i].activity === 0) {
				villageData[ID].village.creatures.people[i].moveType = 0;
			} else if (villageData[ID].village.creatures.people[i].activity === 1 || villageData[ID].village.creatures.people[i].activity === 2) {
				villageData[ID].village.creatures.people[i].moveType = 1;
			}

			if (count%5 === 0) {
				if (villageData[ID].village.creatures.people[i].pathSpot < villageData[ID].village.creatures.people[i].pathArr.length) {
					villageData[ID].village.theGrid[villageData[ID].village.creatures.people[i].position] = true;
					villageData[ID].village.creatures.people[i].position = villageData[ID].village.creatures.people[i].pathArr[villageData[ID].village.creatures.people[i].pathSpot]
					villageData[ID].village.creatures.people[i].direction = villageData[ID].village.creatures.people[i].dirArr[villageData[ID].village.creatures.people[i].pathSpot];
					villageData[ID].village.creatures.people[i].pathSpot++;
				} else {
					villageData[ID].village.creatures.people[i].makePath = true;
					villageData[ID].village.creatures.people[i].pathSpot = 0;
				}
			}
		}//for peeps

		for (var i = 0; i < villageData[ID].village.creatures.animals.length; i++) { 
			if (villageData[ID].village.creatures.animals[i].makePath) {
				pathAnimal(villageData[ID].village.creatures.animals[i].position, 0, false, i, ID);
			}

			if (count%8 === 0) {
				if (villageData[ID].village.creatures.animals[i].pathSpot < villageData[ID].village.creatures.animals[i].pathArr.length) {
					villageData[ID].village.theGrid[villageData[ID].village.creatures.animals[i].position] = true;
					villageData[ID].village.creatures.animals[i].position = villageData[ID].village.creatures.animals[i].pathArr[villageData[ID].village.creatures.animals[i].pathSpot];
					villageData[ID].village.creatures.animals[i].direction = villageData[ID].village.creatures.animals[i].dirArr[villageData[ID].village.creatures.animals[i].pathSpot];
					villageData[ID].village.creatures.animals[i].pathSpot++;
				} else {
					villageData[ID].village.creatures.animals[i].makePath = true;
					villageData[ID].village.creatures.animals[i].pathSpot = 0;
				}
			}
		}//for animals






	},
	writeToFile: function (ID) {
		for (var i = 0; i < 2500; i++) {
			if (i % 50 === 0 || i % 50 === 49 || i < 50 || i > 2449) {
				villageData[ID].village.theGrid[i] = false;
			}
		}
		fs.writeFileSync('./village.json', JSON.stringify(villageData, null, 4));
	}
}



















pathPerson = function (from, to, goingPlaces, j, ID) {
	//console.log("pathPerson");
	if (goingPlaces === false) {
		to = 0;
		var goodTarget = false;
		while(goodTarget === false) {
			to = randomInt(0, 2500);
			if (villageData[ID].village.theGrid[to] && Math.abs(((from%50)-(to%50))) + Math.abs(parseInt(from/50)-parseInt(to/50)) <= 10) {
				goodTarget = true;
			}
		}
	}

	HValueArr = [];
	calcHValue(to, 0);
	var openList = new AStarTree(HValueArr[from], 0, from, 8, 'true');
	findSuccessors(from, to, openList, ID);

	arrForParents = [];
	dirArr = [];
	villageData[ID].village.creatures.people[j].pathArr = traceParents(openList, to).reverse();
	villageData[ID].village.creatures.people[j].dirArr = traceDir(openList, to).reverse();
	villageData[ID].village.creatures.people[j].makePath = false;
	return to;
}

pathAnimal = function (from, to, goingPlaces, j, ID) {
	//console.log("pathAnimal");
	if (goingPlaces === false) {
		to = 0;
		var goodTarget = false;
		while(goodTarget === false) {
			to = randomInt(0, 2500);
			if (villageData[ID].village.theGrid[to] && Math.abs(((from%50)-(to%50))) + Math.abs(parseInt(from/50)-parseInt(to/50)) <= 10) {
				goodTarget = true;
			}
		}
	}

	HValueArr = [];
	calcHValue(to, 0);
	var openList = new AStarTree(HValueArr[from], 0, from, 8, 'true');
	findSuccessors(from, to, openList, ID);

	arrForParents = [];
	dirArr = [];
	villageData[ID].village.creatures.animals[j].pathArr = traceParents(openList, to).reverse();
	villageData[ID].village.creatures.animals[j].dirArr = traceDir(openList, to).reverse();
	villageData[ID].village.creatures.animals[j].makePath = false;
	return to;
}
traceParents = function (list, start) {
	//console.log("traceParents");
	var next = true;
	var toLook = start;
	arrForParents.push(start);
	while (next) {
		list.traverseDF(function(node){
			if (node.data.id === toLook) {
				if (node.parent !== null) {
					arrForParents.push(node.parent.data.id);
					toLook = node.parent.data.id;
				} 
				else {
					next = false;
				}
			}
		});
	}
	return arrForParents;
}

traceDir = function (list, start) {
	//console.log("traceDir");
	var next = true;
	var toLook = start;
	dirArr.push(0);
	while (next) {
		list.traverseDF(function(node){
			if (node.data.id === toLook) {
				if (node.parent !== null) {
					dirArr.push(node.parent.data.dir);
					toLook = node.parent.data.id;
				} 
				else {
					next = false;
				}
			}
		});
	}
	return dirArr;
}

findSuccessors = function (start, target, open, ID) {
	//console.log("findSuccessors");
	var move = [10, 14, 10, 14, 10, 14, 10, 14];
	var spots = [start-50, start-50+1, start+1, start+50+1, start+50, start+50-1, start-1, start-50-1];
	var parentMove = 0;
	var temp  = null;
	var dirNext;
	var lowest = 50000000000000;
	var lowestID = -1;
	var nextID = -1;
	var quit = false;

	open.contains(function(node) {
		if (node.data.id === start) {
			parentMove = node.data.G;
		} 
	}, open.traverseDF);

	var cs = lookAround(start, parentMove, open, ID);

	open.traverseDF(function(node) {
		if (node.data.F < lowest && node.data.check === 'false') {
			lowest = node.data.F;
			lowestID = node.data.id;
			dirNext = node.data.dir;
		}
	});

	open.traverseDF(function(node) {
		if (node.data.id === lowestID) {
			if (node.data.H === 0) {
				quit = true;
			}
			else {
				node.data.check = 'true';
			}
		}
	});

	if (quit) return true;


	return findSuccessors(lowestID, target, open, ID);

}

checkIfTrue = function(spot, list) {
	//console("checkIfTrue");
	var good = true;
	list.traverseDF(function(node) {
		if (node.data.id === spot) {
			if (node.data.id === 'true') {
				good = false;
			}
			return false;
		}
	});

	if (good) return true;
	return false;
}

lookAround = function (start, parentMove, open, ID) {
	//console.log("lookAround");
	var cs = [true, true, true, true, true, true, true, true];
	var move = [10, 14, 10, 14, 10, 14, 10, 14];
	var opens = [false, false, false, false, false, false, false, false];
	var spots = [start-50, start-50+1, start+1, start+50+1, start+50, start+50-1, start-1, start-50-1];
	var parent;

	for (var i = 0; i < 8; i++) {
		if (villageData[ID].village.theGrid[spots[i]] === false) {
			cs[i] = false;
		}
		if (spots[i] < 0 || spots[i] >= 2500) {
			cs[i] = false;
		}
	}


	open.contains(function(node) {
		if (node.data.id === start) {
			parent = node;
		}
	}, open.traverseDF);

	open.traverseDF(function(node) {
		for (var i = 0; i < 8; i++) {
			if (node.data.id === spots[i]) {
				opens[i] = true;
			}
		}
	});

	for (var i = 0; i < 8; i++) {
		if (cs[i]) {
			if (opens[i]) {
				open.contains(function(node) {
					if (node.data.id === spots[i]) {
						if (node.data.G > move[i]+parentMove) {
							node.data.G = move[i]+parentMove;
							node.parent = parent;
						}
					}
				}, open.traverseDF);
				cs[i] = false;
			}
			else {
				open.add(HValueArr[spots[i]], move[i]+parentMove, spots[i], i, 'false', start, open.traverseDF);
			}
		}
	}

	return cs;
}

updateGrid = function (ID) {
	//console.log("updateGrid");
	for (var i = 0; i < villageData[ID].village.creatures.people.length; i++) {
		villageData[ID].village.theGrid[villageData[ID].village.creatures.people[i].position] = false;
	}
	for (var i = 0; i < villageData[ID].village.creatures.animals.length; i++) {
		villageData[ID].village.theGrid[villageData[ID].village.creatures.animals[i].position] = false;
	}
	for (var i = 0; i < villageData[ID].village.buildings.length; i++) {
		for (var j = 0; j < villageData[ID].village.buildings[i].LnW[0]; j++) {
			for (var k = 0; k < villageData[ID].village.buildings[i].LnW[1]; k++) {
				villageData[ID].village.theGrid[villageData[ID].village.buildings[i].position+j+(50*k)] = false;
			}
		}
	}
	for (var i = 0; i < villageData[ID].village.terrain.objects.rocks.length; i++) {
		for (var j = 0; j < villageData[ID].village.terrain.objects.rocks[i].LnW[0]; j++) {
			for (var k = 0; k < villageData[ID].village.terrain.objects.rocks[i].LnW[1]; k++) {
				villageData[ID].village.theGrid[villageData[ID].village.terrain.objects.rocks[i].position+j+(50*k)] = false;
			}
		}
	}
	for (var i = 0; i < villageData[ID].village.terrain.objects.trees.length; i++) {
		for (var j = 0; j < villageData[ID].village.terrain.objects.trees[i].LnW[0]; j++) {
			for (var k = 0; k < villageData[ID].village.terrain.objects.trees[i].LnW[1]; k++) {
				villageData[ID].village.theGrid[villageData[ID].village.terrain.objects.trees[i].position+j+(50*k)] = false;
			}
		}
	}
}