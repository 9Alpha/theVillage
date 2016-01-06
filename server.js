var  express =  require('express');
var  path =  require('path');
var  app =  express();
var ejs = require('ejs');
var bodyParser = require('body-parser');  
var querystring = require('querystring');
var http = require('http');
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

var fs = require("fs");

var options = {
	host: '',
	path: '',
	port: 4000,
	method: ''
};
//var content = fs.readFileSync("public/index.html", 'utf8');


app.use("/public", express.static(path.join(__dirname,'public')));

app.get('/', function(req, res){
	res.render("login.ejs");
});

app.post('/checkLogin', function(req, res){
	setRoute('localhost', '/checkLogin', 'POST');
	var logInfo = JSON.parse(JSON.stringify(req.body));
	var data = querystring.stringify({
      info: [
      	logInfo.info[0],
      	logInfo.info[1]
      ]
    });
	console.log(logInfo+"     "+data);
	var toGo = http.request(options, function(response) {
		var temp = '';
		response.on('data', function(chunk) {
			temp+=chunk;
		});
		response.on('end', function() {
		res.send(temp);
		});
	});
	toGo.write(data);
	toGo.end();
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
	setRoute('localhost', '/vilData/'+req.params.id, 'GET');
	http.request(options, function(response) {
		var temp = '';
		response.on('data', function(chunk) {
			temp+=chunk;
		});
		response.on('end', function() {
		res.send(temp);
		});
	}).end();
});

app.put('/vilData/:id', function(req, res){
	console.log("did stuff");
	setRoute('localhost', '/vilData/'+req.params.id, 'PUT');
	http.request(options, function(response) {
		var temp = '';
		response.on('data', function(chunk) {
			temp+=chunk;
		});
		response.on('end', function() {
		res.send("sent");
		});
	}).end();
});



app.listen(process.env.PORT || 5000);


setRoute = function(host, path, method) {
	options.host = host;
	options.path = path;
	options.method = method;
}


