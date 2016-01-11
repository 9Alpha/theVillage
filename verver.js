

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
		if (toSpot%50 >= i%50) {
			temp+=((toSpot%50)-(i%50));
		} else {
			temp+=((50-(toSpot%50))-(50-(i%50)));
		}
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

function Node(A, B, id, check) {
	var C = A + B;
	this.data = {"id": id, "H": A, "G": B, "F": C, "check": check};
	this.parent = null;
	this.children = [];
}

function AStarTree(A, B, id, check) {
	var node = new Node(A, B, id, check);
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

AStarTree.prototype.add = function(A, B, id, check, toData, traversal) {
	var child = new Node(A, B, id, check),
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
		console.log('Cannot add node to a non-existent parent. '+toData);
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
		for (var i = 0; i < 1; i++) { //villageData.users[ID].village.creatures.people.length; i++) {
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
		var openList = new AStarTree(0, 0, from, 'true');
		var closedList = new AStarTree(0, 0, 2501, 'true');
		closedList.add(0, 0, from, 'true', 2501, closedList.traverseDF);
		HValueArr = [];
		calcHValue(to, 0);
		console.log("path is "+path(from, openList, closedList, ID));
				// openList.traverseDF(function(node) {
				// 	if (node.parent !== null) 
				// 		console.log("id: "+node.data.id+" H: "+node.data.H+" G: "+node.data.G+" F: "+node.data.F+"--->"+node.parent.data.id);
				// 	else 
				// 		console.log("id: "+node.data.id+" H: "+node.data.H+" G: "+node.data.G+" F: "+node.data.F+"--->ROOT");
				// });
arrForParents = [];
villageData.users[ID].village.creatures.people[i].pathArr = traceParents(openList, lastNode).reverse();
villageData.users[ID].village.creatures.people[i].makePath = false;
}

if (count%3 === 0) {
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
	fs.writeFileSync('./village.json', JSON.stringify(villageData, null, 4));
}
}


















traceParents = function (list, start) {
	next = true;
	toLook = start;
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

path = function (start, open, closed, ID) {
	lookAround(start, open, closed, ID);
	var lowest = 50000000000000;
	var lowestID = -1;
	var next = true;
	open.traverseDF(function(node) {
		//console.log("id: "+node.data.id+" check: "+node.data.check);
		if (node.data.F < lowest && node.data.check === 'false') {
			lowest = node.data.F;
			lowestID = node.data.id;
		}
	});

	if (lowestID === -1) {
		next = false;
	}
	console.log(lowestID);
	lastNode = lowestID;
	open.contains(function(node) {
		if (node.data.id === lowestID) {
			if (node.data.H === 1) {
				console.log("finished path");
				next = false;
			}
			else {
				node.data.check = 'true';
			}
		}
	}, open.traverseDF);

	if (next) {
		console.log("--------------------");
		closed.add(0, 0, lowestID, 'true', 2501, closed.traverseDF);
		path(lowestID, open, closed, ID);
	}

	return lowestID;
}

lookAround = function (start, open, closed, ID) {
	var cs = [true, true, true, true, true, true, true, true];
	var notOpen = [true, true, true, true, true, true, true, true];
	var move = [10, 14, 10, 14, 10, 14, 10, 14];
	var spots = [start-50, start-50+1, start+1, start+50+1, start+50, start+50-1, start-1, start-50-1];
	var parentMove = 0;
	var parent;

	open.contains(function(node) {
		if (node.data.id === start) {
			parentMove = node.data.G;
			parent = node;
		}
		for (var i = 0; i < 8; i++) {
			if (node.data.id === spots[i]) {
				notOpen[i] = false;
			}
		}
	}, open.traverseDF);

	closed.contains(function(node) {
		for (var i = 0; i < 8; i++) {
			if (node.data.id === spots[i]) {
				cs[i] = false;
			}
		}
	}, closed.traverseDF);

	for (var i = 0; i < 8; i++) {
		if (villageData.users[ID].village.theGrid[spots[i]] === false) {
			cs[i] = false;
		}
		if (spots[i] < 0 || spots[i] >= 2500) {
			cs[i] = false;
		}
	}

	open.contains(function(node) {
		for (var i = 0; i < 8; i++) {
			if (cs[i]) {
				if (notOpen[i] === false) {
					if (node.data.G > move[i]+parentMove) {
						node.parent = parent;
						console.log("a");
					}
				}
				else {
					console.log("b");
					open.add(HValueArr[spots[i]], move[i]+parentMove, spots[i], 'false', start, open.traverseDF);
				}
			}
		}
	}, open.traverseDF);
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

