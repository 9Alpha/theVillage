

var fs = require("fs");
var villageData = JSON.parse(fs.readFileSync("./village.json"));
var falsed = [];

var timeA = 0;
var timeB = 0;
var timeDif = 0;

var HValueArr= [];

var doIt = true;

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

calcHValue(1329, 0);

function findIndex(arr, data) {
    var index;
 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data.id === data) {
            index = i;
        }
    }
 
    return index;
}

function Node(A, B, id) {
	var C = A + B;
	this.data = {"id": id, "H": A, "G": B, "F": C};
	this.parent = null;
	this.children = [];
}

function AStarTree(A, B, id) {
	var node = new Node(A, B, id);
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

AStarTree.prototype.add = function(A, B, id, toData, traversal) {
	var child = new Node(A, B, id),
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
		console.log('Cannot add node to a non-existent parent.');
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

var tree = new AStarTree(HValueArr[1279], 10, 1279);
tree.add(HValueArr[195], 10, 195, 1279, tree.traverseDF);
tree.add(HValueArr[86], 10, 86, 1279, tree.traverseDF);
tree.traverseDF(function(node) {
	if (node.parent !== null) 
		console.log("id: "+node.data.id+" H: "+node.data.H+" G: "+node.data.G+" F: "+node.data.F+"--->"+node.parent.data.id);
	else 
		console.log("id: "+node.data.id+" H: "+node.data.H+" G: "+node.data.G+" F: "+node.data.F+"--->ROOT");
});

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

		var date1 = new Date();
		timeA = date1.getMilliseconds();
		updateGrid(ID);
		var date2 = new Date();
		timeB = date2.getMilliseconds();

		timeDif = timeB - timeA;

		timeDif = 0;


		var from = 1331;
		if (doIt) {
			var openList = new AStarTree(0, 0, from);
			var closedList = new AStarTree(0, 0, -1);
			closedList.add(0, 0, from, -1, closedList.traverseDF);
			//path(from, 1329, openList, closedList, ID);
			doIt = false;
		}

	},
	writeToFile: function (ID) {
		fs.writeFileSync('./village.json', JSON.stringify(villageData, null, 4));
	}
}

path = function (start, target, open, closed, ID) {
	lookAround(start, open, closed, ID);
	var lowest = 50000000000000;
	var lowestID = -1;
	var next = true;
	open.traverseDF(function(node) {
		if (node.data.F < lowest) {
			lowest = node.data.F;
			lowestID = node.data.id;
		}
	});

	//console.log(lowestID);

	open.contains(function(node) {
		if (node.data.id === lowestID) {
			if (node.data.H === 1) {
				console.log("finished path");
				next = false;
			}
		}
	}, open.traverseDF);

	if (next) {
		path(lowestID, target, open, closed, ID);
	}

	return true;
}

lookAround = function (start, open, closed, ID) {
	var cs = [true, true, true, true, true, true, true, true];
	var move = [10, 14, 10, 14, 10, 14, 10, 14];
	var spots = [start-50, start-50+1, start+1, start+50+1, start+50, start+50-1, start-1, start-50-1];
	var parentMove = 0;

	open.contains(function(node) {
		if (node.data.id === start) {
			parentMove = node.data.G;
		}
	}, open.traverseDF);

	closed.contains(function(node) {
		if (node.data.id === spots[0]) {
			cs[0] = false;
		}
		else if (node.data.id === spots[1]) {
			cs[1] = false;
		}
		else if (node.data.id === spots[2]) {
			cs[2] = false;
		}
		else if (node.data.id === spots[3]) {
			cs[3] = false;
		}
		else if (node.data.id === spots[4]) {
			cs[4] = false;
		}
		else if (node.data.id === spots[5]) {
			cs[5] = false;
		}
		else if (node.data.id === spots[6]) {
			cs[6] = false;
		}
		else if (node.data.id === spots[7]) {
			cs[7] = false;
		}
	}, closed.traverseDF);

	for (var i = 0; i < 8; i++) {
		if (villageData.users[ID].village.theGrid[spots[i]] === false) {
			cs[i] = false;
		}
		if (cs[i]) {
			open.add(HValueArr[spots[i]], move[i]+parentMove, spots[i], start, open.traverseDF);
		}
	}

	//console.log(cs);
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

