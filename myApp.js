var express = require('express');
var bodyParser = require('body-parser');

var app = express();



app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded( {extended: false} ));

const absolutePath = __dirname + '/views/index.html';


app.get("/", function(req, res) {
  
  res.sendFile(absolutePath);
});


app.use(function(req, res, next) {
	console.log(`${req.method} ${req.path} - ${req.ip}`);

	next();
});


app.get('/json', function(req, res) {
  if (process.env['MESSAGE_STYLE'] === 'uppercase') {
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
});


app.get('/now', function(req, res, next) {
	req.time = new Date().toString();
	next();
}, function(req, res) {
	res.json( {"time": req.time} );
});


app.get('/:word/echo', function(req, res) {
	let word = req.params.word;
	
	res.json( {echo: word} );
});


app.get('/name', function(req, res) {
	let first = req.query.first;
	let last = req.query.last;
	
	res.json( {name: first + ' ' + last} );
});
app.post('/name', function(req, res) {
	let first = req.body.first;
	let last = req.body.last;
	
	res.json( {name: first + ' ' + last} );
});





















 module.exports = app;
