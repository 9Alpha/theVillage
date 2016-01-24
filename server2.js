
var  express =  require('express');
var  path =  require('path');
var  app =  express();
var ejs = require('ejs');
var verver = require('./verver');
var bodyParser = require('body-parser');  
var mongoose = require('mongoose');
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var fs = require("fs");
//var content = fs.readFileSync("public/index.html", 'utf8');


app.use("/public", express.static(path.join(__dirname,'public')));

app.get('/', function(req, res){
	res.send("This page does nothing");
});

app.get('/vilInit', function(req, res){
	User.find().lean().exec( function (err, stuff){
		verver.getData(stuff);
		//console.log(stuff+"----------------------------");
	});
	res.send(true);
});

app.get('/vilData/:id', function(req, res){
	var temp = JSON.parse(verver.getUserArr());
	//console.log(temp);
	//console.log(temp[req.params.id]+"----");
	verver.update(temp[req.params.id]);
	res.send(verver.sendUser(temp[req.params.id]));
});

app.post('/vilData/:id', function(req, res){
	console.log("did stuff");
	rewrite(verver.sendData);
	res.send("sent");
});


app.post('/updateAccount/:id', function(req, res){
	var temp = JSON.parse(JSON.stringify(req.body));
	console.log(temp.info);
	var toChange = temp.type;
	if (toChange === "people") 
		User.update({userID: req.params.id}, { $set: {people: temp.info}}, function(err, num){res.send("Data updated: "+JSON.stringify(num))});
});


app.post('/checkLogin', function(req, res){
	var temp = req.body;
	console.log(temp);
	var usr = temp.usr;
	var pss = temp.pss;
	User.findOne({'userName' : usr}, 'userName password userID', function (err, user) {
		if (err) {
			res.send(false);
		}
		else if (user !== null && user.password === pss) {
			res.send((user.userID).toString());
		}
		else {
			res.send(false);
		}
	});
});

app.put('/makeLogin', function(req, res){
	var temp = req.body;
	var usr = temp.usr;
	var pss = temp.pss;
	var randX = randomInt(111111,999999);

	var newAccount = new User(
	{
		userName: usr,
		password: pss,
		userID: randX,
		village: {
			name: "Village",
			date_created: new Date(),
			theGrid: [],
			creatures: {
				people: [],
				animals: []
			},
			buildings: [],
			terrain: {
				weather: {
					options: {
						sun_chance: 0,
						rain_chance: 0
					},
					current: {
						type: 2
					}
				},
				temperature: {
					value: 0,
					range: {
						hi: 0,
						lo: 0
					}
				},
				terrain_types: {
					wind: 0,
					hills: 0
				},
				objects: {
					rocks: [],
					trees: []
				}
			}
		}
	});
	newAccount.save(function (err) {

	});
	res.send(randX.toString());
});


app.listen(process.env.PORT || 4000);


rewrite = function (toSend) {
	//User.remove(function (err, removed) {});
	var temp = JSON.parse(toSend);
	console.log(temp);
}


mongoose.connect('mongodb://John:Cats@ds047315.mongolab.com:47315/thevillage');

var Schema = mongoose.Schema;

var db = mongoose.connection;

db.on('error', function (err) {
	console.log('connection error', err);
});

db.once('open', function () {
	console.log('connected.');
});

var userGuide = new Schema({
	userName: String,
	password: String,
	userID: Number,
	village: {
		name: String,
		date_created: Date,
		theGrid: Array,
		creatures: {
			people: Array,
			animals: Array
		},
		buildings: Array,
		terrain: {
			weather: {
				options: {
					sun_chance: Number,
					rain_chance: Number
				},
				current: Object
			},
			temperature: {
				value: Number,
				range: {
					hi: Number,
					lo: Number
				}
			},
			terrain_types: {
				wind: Number,
				hills: Number
			},
			objects: {
				rocks: Array,
				trees: Array
			}
		}
	}
});

var User = mongoose.model('User', userGuide);
var d = new Date();

