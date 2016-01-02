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
	res.render("login.ejs");
});

app.post('/checkLogin', function(req, res){
	var temp = req.body;
	console.log(temp);
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

app.get('/options', function(req, res){
	res.send("options page");
});

app.put('/options', function(req, res){
	var gotten = req.body;
	res.send(gotten);
});

app.get('/village', function(req, res){
	res.render("villagePage.ejs");
});

app.get('/vilData/:id', function(req, res){
	verver.update(req.params.id);
	res.send(verver.sendData(req.params.id));
});

app.put('/vilData/:id', function(req, res){
	console.log("did stuff");
	verver.writeToFile(req.params.id);
	res.send("sent");
});



app.listen(process.env.PORT || 5000);