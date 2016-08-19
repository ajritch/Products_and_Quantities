var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, './static')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
	res.render('index');
});

var server = app.listen(7000, function() {
	console.log('listening on port 7000');
});