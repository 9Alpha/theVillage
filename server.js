var  express =  require('express');
var  path =  require('path');
var  app =  express();
var ejs = require('ejs');
var bodyParser = require('body-parser');  
var querystring = require('querystring');
var http = require('http');
var request = require('request');
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

	var temp = JSON.parse(JSON.stringify(req.body));
	var usr = temp.info[0];
	var pss = temp.info[1];
	//console.log(JSON.stringify(temp));

	request.post('http://localhost:4000/checkLogin', {form:{usr:usr, pss:pss}}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
    		console.log(body); 
    		res.send(body);
		}
	});
});

app.put('/makeLogin', function(req, res){
	var temp = JSON.parse(JSON.stringify(req.body));
	var usr = temp.info[0];
	var pss = temp.info[1];
	//console.log(JSON.stringify(temp));

	request.put('http://localhost:4000/makeLogin', {form:{usr:usr, pss:pss}}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
    		console.log(body); 
    		res.send(body);
		}
	});
});

app.get('/options', function(req, res){
	res.render("optionsPage.ejs");
});

app.put('/options', function(req, res){
	var gotten = req.body;
	res.render("optionsPage.ejs");
});

app.get('/village', function(req, res){
	res.render("villagePage.ejs");
});

app.get('/vilInit', function(req, res){
	request('http://localhost:4000/vilInit', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.send(body) 
		}
	});
});

app.get('/vilData/:id', function(req, res){
	request('http://localhost:4000/vilData/'+req.params.id, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.send(body) 
		}
	});
});

app.post('/vilData/:id', function(req, res){
	request.post('http://localhost:4000/vilData/'+req.params.id, {form: "hi"}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
    		console.log(body); 
    		res.send(body);
		}
	});
});



app.listen(process.env.PORT || 5000);




