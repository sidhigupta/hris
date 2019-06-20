
var mysql = require('mysql');
//var app = express();
var connection = mysql.createConnection({
    // propertires..
    host:'localhost',
    user:'root',
    password:'',
    database:'sampleDB'
});
connection.connect(function(error){
    if(!!error){
        console.log('Error');
    }else{
        console.log('Connected');  
    }
});
module.exports = connection;
// const express = require('express');
// const favicon = require('express-favicon');
 
// const app = express();
 
// app.use(favicon(__dirname + '/public/favicon.png'));
 
// // Add your routes here, etc.
 
// const server = app.listen(3000, function(){
//     console.log('server is running at %s .', server.address().port);
// });

