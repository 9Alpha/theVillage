var  express =  require('express');
var  path =  require('path');
var  app =  express();
var ejs = require('ejs');
var verver = require('./verver');
var bodyParser = require('body-parser');  

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
	console.log(req.body);
	var temp = req.body;
	var usr = temp.info[0];
	var pss = temp.info[1];
	for (var i = 0; i < verver.sendData().users.length; i++) {
		console.log(verver.sendData().users[i].userName+"    "+verver.sendData().users[i].password+"    real--> "+usr+"  "+pss);
		if (usr === verver.sendData().users[i].userName && pss === verver.sendData().users[i].password) {
			res.send(true);
		}
	}
	res.send(false);
});

app.put('/makeLogin', function(req, res){
	res.send("yee");
});


app.listen(process.env.PORT || 4000);

