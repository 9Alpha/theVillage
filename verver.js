var  express =  require('express');
var  path =  require('path');
var  app =  express();
var ejs = require('ejs');

var bodyParser = require('body-parser');  

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

var fs = require("fs");











app.listen(process.env.PORT || 4000);