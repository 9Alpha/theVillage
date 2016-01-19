

var fs = require("fs");
var villageData = JSON.parse(fs.readFileSync("./village.json"));
var falsed = [];

var timeA = 0;
var timeB = 0;
var timeDif = 0;

var HValueArr = [];

var lastNode = 0;

var arrForParents = [];

var count = 0;

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcHValue(toSpot, ID) {
	var temp = 0;
	for (var i = 0; i < villageData.users[ID].village.theGrid.length; i++) {
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
	sendData: function() {
		return villageData;
	},
	sendUser: function (ID) {
		count++;
		return villageData.users[ID].village;
	},
	update: function (ID) {
		for (var i = 0; i < villageData.users[ID].village.creatures.people.length; i++) {
			if (villageData.users[ID].village.creatures.people[i].makePath) {
				var from = villageData.users[ID].village.creatures.people[i].position;
				var to = 0;
				var goodTarget = false;
				while(goodTarget === false) {
					to = randomInt(0, 2500);
					if (villageData.users[ID].village.theGrid[to]) {
						goodTarget = true;
					}
				}
				HValueArr = [];
				calcHValue(to, 0);
				var openList = new AStarTree(HValueArr[from], 0, from, 8, 'true');
				findSuccessors(from, to, openList, ID);
				arrForParents = [];
				villageData.users[ID].village.creatures.people[i].pathArr = traceParents(openList, to).reverse();
				villageData.users[ID].village.creatures.people[i].makePath = false;
			}

			if (count%5 === 0) {
				if (villageData.users[ID].village.creatures.people[i].pathSpot < villageData.users[ID].village.creatures.people[i].pathArr.length) {
					villageData.users[ID].village.theGrid[villageData.users[ID].village.creatures.people[i].position] = true;
					villageData.users[ID].village.creatures.people[i].position = villageData.users[ID].village.creatures.people[i].pathArr[villageData.users[ID].village.creatures.people[i].pathSpot];
					villageData.users[ID].village.creatures.people[i].pathSpot++;
				} else {
					villageData.users[ID].village.creatures.people[i].makePath = true;
					villageData.users[ID].village.creatures.people[i].pathSpot = 0;
				}
			}
		}

		for (var i = 0; i < villageData.users[ID].village.creatures.animals.length; i++) {
			villageData.users[ID].village.creatures.animals[i].position.x+=randomInt(-1, 1);
			villageData.users[ID].village.creatures.animals[i].position.y+=randomInt(-1, 1);
		}

		var date1 = new Date();
		timeA = date1.getMilliseconds();
		updateGrid(ID);
		var date2 = new Date();
		timeB = date2.getMilliseconds();

		timeDif = timeB - timeA;

		timeDif = 0;




	},
	writeToFile: function (ID) {
		for (var i = 0; i < 2500; i++) {
			if (i % 50 === 0 || i % 50 === 49 || i < 50 || i > 2449) {
				villageData.users[ID].village.theGrid[i] = false;
			}
		}
		fs.writeFileSync('./village.json', JSON.stringify(villageData, null, 4));
	}
}


















traceParents = function (list, start) {
	next = true;
	toLook = start;
	arrForParents.push(start);
	while (next) {
		//console.log("looking for parents");
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


findSuccessors = function (start, target, open, ID) {
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
	var cs = [true, true, true, true, true, true, true, true];
	var move = [10, 14, 10, 14, 10, 14, 10, 14];
	var opens = [false, false, false, false, false, false, false, false];
	var spots = [start-50, start-50+1, start+1, start+50+1, start+50, start+50-1, start-1, start-50-1];
	var parent;

	for (var i = 0; i < 8; i++) {
		if (villageData.users[ID].village.theGrid[spots[i]] === false) {
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
	for (var i = 0; i < villageData.users[ID].village.creatures.people.length; i++) {
		villageData.users[ID].village.theGrid[villageData.users[ID].village.creatures.people[i].position] = false;
	}
	for (var i = 0; i < villageData.users[ID].village.creatures.animals.length; i++) {
		villageData.users[ID].village.theGrid[villageData.users[ID].village.creatures.animals[i].position] = false;
	}
	for (var i = 0; i < villageData.users[ID].village.buildings.length; i++) {
		for (var j = 0; j < villageData.users[ID].village.buildings[i].LnW[0]; j++) {
			for (var k = 0; k < villageData.users[ID].village.buildings[i].LnW[1]; k++) {
				villageData.users[ID].village.theGrid[villageData.users[ID].village.buildings[i].position+j+(50*k)] = false;
			}
		}
	}
}

