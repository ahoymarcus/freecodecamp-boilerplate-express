var express = require('express');
var app = express();


app.use('/public', express.static(__dirname + '/public'));

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





























 module.exports = app;
