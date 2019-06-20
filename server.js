
// ================================================================
// get all the tools we need
// ================================================================
var express = require('express');
var routes = require('./routes/index.js');
nodeMailer = require('nodemailer');
var fs = require('fs');

var port = process.env.PORT || 2000;
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'))
// ================================================================
// setup our express application
// ================================================================
//app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');
// ================================================================
// setup routes
// ================================================================
routes(app);
// ================================================================
// start our server
// ================================================================
app.listen(port, function() {
	console.log('Server listening on port ' + port + '…');
});


