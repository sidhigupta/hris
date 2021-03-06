var email 	= require("./path/to/emailjs/email");
var server 	= email.server.connect({
   user:    "sidhiagra", 
   password:"sidhi@123", 
   host:    "sidhiagra@gmail.com", 
   ssl:     true
});
 
// send the message and get a callback with an error or details of the message that was sent
server.send({
   text:    "i hope this works", 
   from:    "you <username@your-email.com>", 
   to:      "someone <someone@your-email.com>, another <another@your-email.com>",
   cc:      "else <else@your-email.com>",
   subject: "testing emailjs"
}, function(err, message) { console.log(err || message); });

//email with attachment
var email 	= require("./path/to/emailjs/email");
var server 	= email.server.connect({
   user:	"username", 
   password:"password", 
   host:	"smtp.your-email.com", 
   ssl:		true
});
 
var message	= {
   text:	"i hope this works", 
   from:	"you <username@your-email.com>", 
   to:		"someone <someone@your-email.com>, another <another@your-email.com>",
   cc:		"else <else@your-email.com>",
   subject:	"testing emailjs",
   attachment: 
   [
      {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
      {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
   ]
};
 
// send the message and get a callback with an error or details of the message that was sent
server.send(message, function(err, message) { console.log(err || message); });
 
// you can continue to send more messages with successive calls to 'server.send', 
// they will be queued on the same smtp connection
 
// or you can create a new server connection with 'email.server.connect' 
// to asynchronously send individual emails instead of a queue