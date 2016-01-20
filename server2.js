
var  express =  require('express');
var  path =  require('path');
var  app =  express();
var ejs = require('ejs');
var verver = require('./verver');
var bodyParser = require('body-parser');  
var mongoose = require('mongoose');
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

var fs = require("fs");
//var content = fs.readFileSync("public/index.html", 'utf8');


app.use("/public", express.static(path.join(__dirname,'public')));

app.get('/', function(req, res){
	res.send("This page does nothing");
});

app.get('/vilData/:id', function(req, res){
	verver.update(req.params.id);
	res.send(verver.sendUser(req.params.id));
});

app.put('/vilData/:id', function(req, res){
	console.log("did stuff");
	verver.writeToFile(req.params.id);
	res.send("sent");
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
			res.send(true);
		}
		else {
			res.send(false);
		}
	});
});

app.put('/makeLogin', function(req, res){
	res.send("yee");
});


app.listen(process.env.PORT || 4000);












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

