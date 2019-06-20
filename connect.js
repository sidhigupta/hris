// var connect = require('connect')
// var favicon = require('serve-favicon')
// var path = require('path')
 
// var app = connect()
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
 
// // Add your middleware here, etc.
 
// app.listen(3000)
const express = require('express');
const favicon = require('express-favicon');
 
const app = express();
 
app.use(favicon(__dirname + '/public/favicon.png'));
 
// Add your routes here, etc.
 
const server = app.listen(3000, function(){
    console.log('server is running at %s .', server.address().port);
});