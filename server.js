var  express =  require('express');
var  path =  require('path');
var  app =  express();
var ejs = require('ejs');

var bodyParser = require('body-parser');  

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

var fs = require("fs");
//var content = fs.readFileSync("public/index.html", 'utf8');


app.use("/public", express.static(path.join(__dirname,'public')));

app.get('/', function(req, res){
	res.redirect("/options");
});

app.get('/options', function(req, res){
	res.send("options page");
});

app.put('/options', function(req, res){
	gotten = req.body;
	res.send(gotten);
});

app.get('/village', function(req, res){
	res.send("village page");
});

app.put('/village', function(req, res){
	gotten = req.body;
	res.send(gotten);
});



app.listen(process.env.PORT || 5000);