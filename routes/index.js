'use strict';
var multer  = require('multer');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const Joi = require('joi');	 
//app.use(express.json());
var app = require('http').createServer()
var io = require('socket.io')(app);
io.on('connection', function(socket) {
 console.log('New User Connected');	
 socket.username = 'User1';
 socket.on('change_name',(data) =>{
	 socket.username = data.username;
	 });
	 socket.on('new_message',(data) =>{
		io.sockets.emit('new_message',{message:data.message,username:socket.username});
		});
 })
 
var db = require('../conn');
// const zlib = require('zlib');  
// const gzip = zlib.createGzip();   
// const inp = fs.createReadStream('input.txt');  
// const out = fs.createWriteStream('input.txt.gz');  
// inp.pipe(gzip).pipe(out); 
var archiver = require('archiver');
 
// create a file to stream archive data to.
var output = fs.createWriteStream(__dirname + '/example.zip');
var archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});
 
// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});
 
// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function() {
  console.log('Data has been drained');
});
 
// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});
 
// good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});
 
// pipe archive data to the file
archive.pipe(output);
 
// append a file from stream

var file1 = __dirname + '/input.txt';
console.log(__dirname);
archive.append(fs.createReadStream(file1), { name: 'input.txt' });
 
// append a file from string
archive.append('string cheese!', { name: 'file2.txt' });
 
// append a file from buffer
var buffer3 = Buffer.from('buff it!');
archive.append(buffer3, { name: 'file3.txt' });
 
// append a file
archive.file('file1.txt', { name: 'file4.txt' });
 
// append files from a sub-directory and naming it `new-subdir` within the archive
archive.directory('subdir/', 'new-subdir');
 
// append files from a sub-directory, putting its contents at the root of archive
archive.directory('subdir/', false);
 
// append files from a glob pattern
archive.glob('subdir/*.txt');
 
// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();

// const curl = new (require( 'curl-request' ))();
// var rp = require('request-promise');
// curl.setHeaders([
//     'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
// ])
// .get('https://www.google.com')
// .then(({statusCode, body, headers}) => {
//     console.log(statusCode, body, headers)
// })
// .catch((e) => {
//     console.log(e);
// });
// function Foo() {
// }
// describe('Foo',function(){
//   var OAuth = require('oauth');
 
//   it('tests trends Twitter API v1.1',function(done){
//     var oauth = new OAuth.OAuth(
//       'https://api.twitter.com/oauth/request_token',
//       'https://api.twitter.com/oauth/access_token',
//       'your application consumer key',
//       'your application secret',
//       '1.0A',
//       null,
//       'HMAC-SHA1'
//     );
//     oauth.get(
//       'https://api.twitter.com/1.1/trends/place.json?id=23424977',
//       'your user token for this app', //test user token
//       'your user secret for this app', //test user secret            
//       function (e, data, res){
//         if (e) console.error(e);        
//         console.log(require('util').inspect(data));
//         done();      
//       });    
//   });
// });
// OAuth1.0 - 3-legged server side flow (Twitter example)
// step 1
// var qs = require('querystring')
//   , oauth =
//     { callback: 'http://mysite.com/callback/'
//     , consumer_key: CONSUMER_KEY
//     , consumer_secret: CONSUMER_SECRET
//     }
//   , url = 'https://api.twitter.com/oauth/request_token'
//   ;
// request.post({url:url, oauth:oauth}, function (e, r, body) {
//   // Ideally, you would take the body in the response
//   // and construct a URL that a user clicks on (like a sign in button).
//   // The verifier is only available in the response after a user has
//   // verified with twitter that they are authorizing your app.
 
//   // step 2
//   var req_data = qs.parse(body)
//   var uri = 'https://api.twitter.com/oauth/authenticate'
//     + '?' + qs.stringify({oauth_token: req_data.oauth_token})
//   // redirect the user to the authorize uri
 
//   // step 3
//   // after the user is redirected back to your server
//   var auth_data = qs.parse(body)
//     , oauth =
//       { consumer_key: CONSUMER_KEY
//       , consumer_secret: CONSUMER_SECRET
//       , token: auth_data.oauth_token
//       , token_secret: req_data.oauth_token_secret
//       , verifier: auth_data.oauth_verifier
//       }
//     , url = 'https://api.twitter.com/oauth/access_token'
//     ;
//   request.post({url:url, oauth:oauth}, function (e, r, body) {
//     // ready to make signed requests on behalf of the user
//     var perm_data = qs.parse(body)
//       , oauth =
//         { consumer_key: CONSUMER_KEY
//         , consumer_secret: CONSUMER_SECRET
//         , token: perm_data.oauth_token
//         , token_secret: perm_data.oauth_token_secret
//         }
//       , url = 'https://api.twitter.com/1.1/users/show.json'
//       , qs =
//         { screen_name: perm_data.screen_name
//         , user_id: perm_data.user_id
//         }
//       ;
//     request.get({url:url, oauth:oauth, qs:qs, json:true}, function (e, r, user) {
//       console.log(user)
//     })
//   })
// })
// var gmAPI = new GoogleMapsAPI();
// var params = {
//   center: '444 W Main St Lock Haven PA',
//   zoom: 15,
//   size: '500x400',
//   maptype: 'roadmap',
//   markers: [
//     {
//       location: '300 W Main St Lock Haven, PA',
//       label   : 'A',
//       color   : 'green',
//       shadow  : true
//     },
//     {
//       location: '444 W Main St Lock Haven, PA',
//       icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe%7C996600'
//     }
//   ],
//   style: [
//     {
//       feature: 'road',
//       element: 'all',
//       rules: {
//         hue: '0x00ff00'
//       }
//     }
//   ],
//   path: [
//     {
//       color: '0x0000ff',
//       weight: '5',
//       points: [
//         '41.139817,-77.454439',
//         '41.138621,-77.451596'
//       ]
//     }
//   ]
// };
// gmAPI.staticMap(params); // return static map URL
// gmAPI.staticMap(params, function(err, binaryImage) {
//   // fetch asynchronously the binary image
// });
var request = require('request');
const http = require('http');
request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'));
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

module.exports = function(app) {

	app.post('/csv',(req,res)=>{
		fs.createReadStream('data.csv')  
		.pipe(csv())
		.on('data', (row) => {
			console.log(row);
		})
		.on('end', () => {
			console.log('CSV file successfully processed');
		});
	})
	http.createServer(function (req, resp) {
		if (req.url === '/doodle.png') {
			if (req.method === 'PUT') {
				req.pipe(request.put('http://mysite.com/doodle.png'))
			} else if (req.method === 'GET' || req.method === 'HEAD') {
				request.get('http://mysite.com/doodle.png').pipe(resp)
			}
		}
	})
var User = require('../controller/dashboard');
        var allUser=[];
        User.get_user(function(err, task) {
            allUser.push(task)
        });
				console.log('---------------'+allUser+'.................')
			app.get('/', function(req, res) {
 		 		
					let blogPosts = [
						 {
								 title 		: 	'login',
								 pathname 	: 	'login',
								 open		: 	'',
								 //data		:   allUser
						 }];
						 //console.log(allUser)
						res.render('pages/index',{ posts: blogPosts });
				});	
				app.get('/forget-password', function(req, res) {
 		 		
					let blogPosts = [
						 {
								 title 		: 	'login',
								 pathname 	: 	'login',
								 open		: 	'',
								 //data		:   allUser
						 }];
						 //console.log(allUser)
						res.render('pages/forget-password/forget-password',{ posts: blogPosts });
				});	
 	app.get('/dashboard', function(req, res) {
		// if(req.session.email) {
		// 	res.write(`<h1>Hello ${req.session.email} </h1><br>`);
		// }	
 		let blogPosts = [
        {
            title 		: 	'Dashboard',
            pathname 	: 	'dashboard',
            open		: 	'',
            data		:   allUser
        }];
        //console.log(allUser)
   		res.render('pages/dashboard/index',{ posts: blogPosts });
 	});
 	// user module
	 	app.get('/newjoinee', function(req, res) {
	 		let blogPosts = [
	        	{
	            	title		: 	'New Joinee',
	            	pathname 	: 	'user',
	            	open		: 	'newjoinee'	
	        	}];
	   		res.render('pages/user/newjoinee', { posts: blogPosts });
		 });
		 module.exports = function(app) {
			var Users = require('../controller/user');
					var allUsers=[];
					User.get_user(function(err, task) {
						allUsers.push(task)
					});
					console.log('---------------'+allUsers+'.................')	
	 	app.get('/updateuser', function(req, res) {
	 		let blogPosts = [
	        	{
	            	title 		: 	'Update Details',
	            	pathname 	: 	'user',
							open		: 	'updateuser'	,
							data		:   allUser
				}];
				  console.log(allUser);
	   		res.render('pages/user/updateuser', { posts: blogPosts });
		 });
		}
	 	app.get('/user_bulk', function(req, res) {
	 		let blogPosts = [
	        	{
	            	title 		: 	'Upload',
	            	pathname 	: 	'user',
								open		: 	'user_bulk',
								data		:   allUser
	        	}];
	   		res.render('pages/user/upload', { posts: blogPosts });
	 	});
	 	app.get('/sendmailalert_nj', function(req, res) {
	 		let blogPosts = [
	        	{
	            	title 		: 	'Send Mail',
	            	pathname 	: 	'user',
	            	open		: 	'sendmail'
	        	}];
	   		res.render('pages/user/sendmail', { posts: blogPosts });
	 	});
	// end user module
 	app.get('/movetracker', function(req, res) {
 		let blogPosts = [
        	{
            	title 		: 	'Movement',
            	pathname 	: 	'movetracker',
            	open		: 	''
        	}];
   		res.render('pages/movetracker/movetracker', { posts: blogPosts });
 	});
 	app.get('/feedback', function(req, res) {
 		let blogPosts = [
        	{
            	title 		: 'Notification',
            	pathname 	: 'feedback'
        	}];
   		res.render('pages/notification/feedback', { posts: blogPosts });
 	});

 	// hirereq module
		app.get('/hire', function(req, res) {
			let blogPosts = [
	        	{
	            	title 		: 'Hiring Requisition Form',
	            	pathname 	: 	'hirereq',
            		open		: 	'hire'
	        	}];
		   	res.render('pages/hiring/hform', { posts: blogPosts });
		});
		app.get('/hireview', function(req, res) {
			let blogPosts = [
	        	{
	            	title 		: 	'Hiring Requisition',
	            	pathname 	: 	'hirereq',           
            		open		: 	'hireview'
	        	}];
		   	res.render('pages/hiring/hview', { posts: blogPosts });
		});
	// end hirereq module

	// admin
		app.get('/function', function(req, res) {
			let blogPosts = [
        	{
            	title 		: 	'Function',
            	pathname 	: 	'admin',           
            	open		: 	'function'
        	}];
	   		res.render('pages/admin/function', { posts: blogPosts });
		});
		app.get('/sfunction', function(req, res) {
			let blogPosts = [
        	{
            	title		: 	'Sub Function',
            	pathname 	: 	'admin',           
            	open		: 	'sfunction'
        	}];
	   		res.render('pages/admin/sfunction', { posts: blogPosts });
		});
		app.get('/process', function(req, res) {
			let blogPosts = [
        	{
            	title 		: 	'Process',
            	pathname 	: 	'admin',           
            	open		: 	'process'
        	}];
	   		res.render('pages/admin/process', { posts: blogPosts });
		});
		app.get('/role', function(req, res) {
			let blogPosts = [
        	{
            	title 		: 	'Role',
            	pathname 	: 	'admin',           
            	open		: 	'role'
        	}];
	   		res.render('pages/admin/role', { posts: blogPosts });
		});
		app.get('/designation', function(req, res) {
			let blogPosts = [
        	{
            	title 		: 	'Designation',
            	pathname 	: 	'admin',           
            	open		: 	'designation'
        	}];
	   		res.render('pages/admin/designation', { posts: blogPosts });
		});
		
	// End admin

 	// report
 		app.get('/newjoineerep', function(req, res) {
 			let blogPosts = [
        	{
            	title 		: 	'New Joinee Report',
            	pathname 	: 	'report',
            	open		: 	'newjoineerep'	
        	}];
   			res.render('pages/report/newjoineerep', { posts: blogPosts });
 		});
 		app.get('/processwiseallocrep', function(req, res) {
 			let blogPosts = [
        	{
            	title 		: 	'Report Process Wise Allocation',
            	pathname 	: 	'report',
            	open		: 	'processwiseallocrep'
        	}];
   			res.render('pages/report/processwiseallocrep', { posts: blogPosts });
 		});
 		app.get('/hrisrep', function(req, res) {
 			let blogPosts = [
        	{
            	title 		: 	'Report HRIS',
            	pathname 	: 	'report',
            	open		: 	'hrisrep'
        	}];
   			res.render('pages/report/hrisrep', { posts: blogPosts });
 		});
 		app.get('/exitwiserep', function(req, res) {
 			let blogPosts = [
        	{
            	title 		: 	'Report Exit Wise',
            	pathname 	: 	'report',
            	open		: 	'exitwiserep'
        	}];
   			res.render('pages/report/exitwiserep', { posts: blogPosts });
 		});
 		app.get('/attritionrep', function(req, res) {
 			let blogPosts = [
        	{
            	title 		: 	'Report Attrition',
            	pathname 	: 	'report',
            	open		: 	'attritionrep'
        	}];
   			res.render('pages/report/attritionrep', { posts: blogPosts });
 		});
 		app.get('/foreignrep', function(req, res) {
 			let blogPosts = [
        	{
            	title 		: 	'Report Foreign',
            	pathname 	: 	'report',
            	open		: 	'foreignrep'
        	}];
   			res.render('pages/report/foreignrep', { posts: blogPosts });
 		});
 		app.get('/movewiserep', function(req, res) {
 			let blogPosts = [
        	{
            	title 		: 	'Report Move Wise',
            	pathname 	: 	'report',
            	open		: 	'movewiserep'
        	}];
   			res.render('pages/report/movewiserep', { posts: blogPosts });
 		});
 		app.get('/usermoverep', function(req, res) {
 			let blogPosts = [
        	{
            	title 		: 	'Report User Movement',
            	pathname 	: 	'report',
            	open		: 	'usermoverep'
        	}];
   			res.render('pages/report/usermoverep', { posts: blogPosts });
 		});
 		app.get('/warningrep', function(req, res) {
 			let blogPosts = [
        	{
            	title 		: 	'Report Warning',
            	pathname 	: 	'report',
            	open		: 	'warningrep'
        	}];
   			res.render('pages/report/warningrep', { posts: blogPosts });
 		});
	 // end report
	 //user add
	 app.get('/', function (req, res) {
		res.render('index');
		});
		
	  // app.get('/',function(req,res){
	  // res.sendfile('index.html');
	  // });
	  app.post('/send-email', function (req, res) {
		let transporter = nodeMailer.createTransport({
			host: 'smtp.googlemail.com',
			port: 465,
			secure: true,
			auth: {
				user: 'sidhiagra',
				pass: 'sidhi@123'
			}
		});
		//fs.readFile("./attachment.txt", function (err, data) {
		let mailOptions = {
			from: '"sidhi gupta" <sidhiagra@gmail.com>', // sender address
			to: req.body.to, // list of receivers
			//email: req.body.email, // Subject line
			//phone: req.body.phone, // Subject line
			subject: req.body.subject, // Subject line
			text: req.body.body, // plain text body
			html: '<b>hello sidhi how are you</b>', // html body
			attachments: [{'filename': 'attachments.txt'}]
		};
	  //});
  
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message %s sent: %s', info.messageId, info.response);
				res.render('index');
			});
		});
		app.get('/index.htm', function (req, res) {
			res.sendFile( __dirname + "/" + "index.htm" );
		 })
		
		// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
	filename: function(req,file,cb){
		cb(null, file.originalname);
 
	}
})

var upload = multer({ storage: storage })
		app.post('/file_upload', upload.single('myFile'), (req, res, next) => {
		
			//const file = req.file
			var img = fs.readFileSync(req.file.path);
			var encode_image = img.toString('base64');
			// // Define a JSONobject for the image attributes for saving to database
			 
			// var finalImg = {
			// 		 contentType: req.file.mimetype,
			// 		 image:new Buffer.alloc(15)
			// 	};
			
			
			if(req.method == "POST"){
				var post  = req.body;
				var fname= post.firstname;
				var lname= post.lastname;
				// var email= post.email;
				// var pass= post.password;
				var location= post.location;
				var age= post.age;
	
				if (!req.file) {
					console.log("No file received");
						message = "Error! in image upload."
					res.render('index',{message: message, status:'danger'});
			
				} else {
									var sql = "INSERT INTO `user`(`first_name`, `last_name`, `age`, `location`, `email`, `password`, `finalImg`) VALUES ('" + fname + "','" + lname + "','" + age + "','" + location + "','" + email + "','" + pass + "','" + req.file.filename + "')";
									//console.log(sql);
									var query = db.query(sql, function(err, result) {
										 res.redirect('/user_bulk');
									});
							
						}  
		 } else {
				res.render('index');
		 }
				
		})
		app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
	if (req.cookies.user_sid && !req.session.user) {
			res.clearCookie('user_sid');        
	}
	next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
	if (req.session.user && req.cookies.user_sid) {
			res.redirect('/dashboard');
	} else {
			next();
	}    
};
// route for Home-Page
app.get('/', sessionChecker, (req, res) => {

	res.redirect('/');
});
		app.get(sessionChecker, (req, res) => {
			res.sendFile(__dirname + '/login/login');
		})
		.post('/login', function (req, res) {
			var post = req.body;
			var username = post.email;
			var password = post.password;
			var sql = "Select * from `user` where email='"+username+"','"+password+"'";
									var query = db.query(sql, function(err, result) {
				             //console.log(result);
										if (!query) {
											res.redirect('/');
									}  else {
										req.session.email = req.body.email;
    								//res.end('done');
										res.redirect('/dashboard');
									}
									});

		 })
		 app.get('/dashboard',(req,res) => {
			 sess = req.session.user;
		 })
		 // route for user logout
				app.get('/logout', (req, res) => {
					if (req.session.user && req.cookies.user_sid) {
							res.clearCookie('user_sid');
							res.redirect('/');
					} else {
							res.redirect('/');
					}
				});
	
		 app.post('/register', function (req, res) {
			
			if(req.method == "POST"){
				var post  = req.body;
				var uname= post.username;
				var email= post.email;
				var pass= post.password;
			
			
				if (!req) {
				
						message = "fill all the details"
					res.render('index',{message: message, status:'danger'});
			
				} else {
									var sql = "INSERT INTO `user`(`username`,  `email`, `password`) VALUES ('" + uname + "','" + email + "','" + pass + "')";
									//console.log(sql);
									var query = db.query(sql, function(err, result) {
										 res.redirect('/');
									});
							
						}  
		 } else {
				res.render('index');
		 }
			
		
		 })
		 // SHOW EDIT USER FORM
		 app.get('/user/edit/(:id)', function(req, res, next){
				 //req.getConnection(function(error, conn) {
						 db.query('SELECT * FROM user WHERE id = ' + req.params.id, function(err, rows, fields) {
								 if(err) throw err
								 
								 // if user not found
								 if (rows.length <= 0) {
										 req.flash('error', 'User not found with id = ' + req.params.id)
										 res.redirect('/user_bulk')
								 }
								 else { // if user found
										 // render to views/user/edit.ejs template file
										 let blogPosts = [
											{
													title 		: 	'Edit User',
													pathname 	: 	'user',
													open		: 	'edit'
													// id: rows[0].id,
													// firstname: rows[0].first_name,
													// lastname: rows[0].last_name,
													// age: rows[0].age,
													// location: rows[0].location,
													//data		:   allUser
											}];
										 res.render('pages/user/edit', { posts:blogPosts
											})
								 }            
						 })
				 //})
		 })
			
		 // EDIT USER POST ACTION
		 app.put('/edit/(:id)', function(req, res, next) {
				 req.assert('name', 'Name is required').notEmpty()           //Validate name
				 req.assert('age', 'Age is required').notEmpty()             //Validate age
				 req.assert('email', 'A valid email is required').isEmail()  //Validate email
			
				 var errors = req.validationErrors()
				 
				 if( !errors ) {   //No errors were found.  Passed Validation!
						 
						 /********************************************
							* Express-validator module
							
						 req.body.comment = 'a <span>comment</span>';
						 req.body.username = '   a user    ';
			
						 req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
						 req.sanitize('username').trim(); // returns 'a user'
						 ********************************************/
						 var user = {
								 name: req.sanitize('name').escape().trim(),
								 age: req.sanitize('age').escape().trim(),
								 email: req.sanitize('email').escape().trim()
						 }
						 
						 req.getConnection(function(error, conn) {
								 conn.query('UPDATE user SET ? WHERE id = ' + req.params.id, user, function(err, result) {
										 //if(err) throw err
										 if (err) {
												 req.flash('error', err)
												 
												 // render to views/user/add.ejs
												 res.render('user_bulk/edit', {
														 title: 'Edit User',
														 id: req.params.id,
														 name: req.body.name,
														 age: req.body.age,
														 email: req.body.email
												 })
										 } else {
												 req.flash('success', 'Data updated successfully!')
												 
												 // render to views/user/add.ejs
												 res.render('user_bulk/edit', {
														 title: 'Edit User',
														 id: req.params.id,
														 name: req.body.name,
														 age: req.body.age,
														 email: req.body.email
												 })
										 }
								 })
						 })
				 }
				 else {   //Display errors to user
						 var error_msg = ''
						 errors.forEach(function(error) {
								 error_msg += error.msg + '<br>'
						 })
						 req.flash('error', error_msg)
						 
						 /**
							* Using req.body.name 
							* because req.param('name') is deprecated
							*/ 
						 res.render('user_bulk/edit', { 
								 title: 'Edit User',            
								 id: req.params.id, 
								 name: req.body.name,
								 age: req.body.age,
								 email: req.body.email
						 })
				 }
		 })
			
		 app.post('/hform_submit', function (req, res) {
			
			if(req.method == "POST"){
				var post  = req.body;
				var fname= post.fname;
				var sfname= post.sfname;
				var pname= post.pname;
				var desig= post.desig;
				var rname= post.rname;
				var reshire= post.reshire;
				var skill= post.skill;
				var forlang= post.forlang;
				var shift= post.shift;
				var edu1= post.edu1;
				var prof= post.prof;
				var exp= post.exp;
				var req_name= post.req_name;
				var sup_name= post.sup_name;
				var aprooved_by= post.aprooved_by;
				var req_date= post.req_date;
				var tar_date= post.tar_date;
				var req_type= post.req_type;
				var pre_verify = post.pre_verify;
				var bill_hq= post.bill_hq;
				var verify_type= post.verify_type;
				var pos_cost= post.pos_cost;
				var hrround= post.hrround;
				var teleint= post.teleint;
				var reqwritten_date= post.written;
				var linemanr= post.linemanr;
				var hodr= post.hodr;
				var clientr= post.clientr;
				var panel1= post.panel1;
				var mail_file= post.mail_file;
				var jd_file= post.jd_file;
				var jd_text= post.jd_text;
				var mail_cc= post.mail_cc;
				var location= post.location;
			
			
				if (!req) {
				
						message = "fill all the details"
					res.render('index',{message: message, status:'danger'});
			
				} else {
									var sql = "INSERT INTO `hiring_form`(`fname`, `sfname`, `desig`, `pname`, `rname`, `reshire`, `skill`, `forlang`, `shift`, `edu1`, `exp`, `prof`, `req_name`, `req_date`, `sup_name`, `approved_by`, `req_type`, `tar_date`, `per_verify`, `bill_hq`, `verify_type`, `pos_cost`) VALUES ('"+fname+"','"+sfname+"','"+desig+"','"+pname+"','"+rname+"','"+reshire+"','"+skill+"','"+forlang+"','"+shift+"','"+edu1+"','"+exp+"','"+prof+"','"+req_name+"','"+req_date+"','"+sup_name+"','"+aprooved_by+"','"+req_type+"','"+tar_date+"','"+pre_verify+"','"+bill_hq+"','"+verify_type+"','"+pos_cost+"')";
									console.log(sql);
									var query = db.query(sql, function(err, result) {
										 res.redirect('/hire');
									});
							
						}  
		 } else {
				res.render('index');
		 }
			
		
		 })

		 // DELETE USER
// app.delete('/delete/(:id)', function(req, res, next) {
// 	var user = { id: req.body.id }
	
// 	req.getConnection(function(error, db) {
// 			db.query('DELETE FROM user WHERE id = ' + req.body.id, user, function(err, result) {
// 					//if(err) throw err
// 					if (err) {
// 							req.flash('error', err)
// 							// redirect to users list page
// 							res.redirect('/user_bulk')
// 					} else {
// 							req.flash('success', 'User deleted successfully! id = ' + req.params.id)
// 							// redirect to users list page
// 							res.redirect('/user_bulk')
// 					}
// 			})
// 	})
// })
app.post('user/delete/(:id)', function(req, res) {
	if(req.method == "POST"){
		var post  = req.body;
		var id= post.id;

		if (!req) {
		
				message = "fill all the details"
			res.render('index',{message: message, status:'danger'});
	
		} else {
							var sql = "DELETE FROM user WHERE id = ' "+ id +"'";
							console.log(sql);
							var query = db.query(sql, function(err, result) {
								req.flash('success', 'User deleted successfully! id = ' + id);
								// 							// redirect to users list page
															res.redirect('/user_bulk');
							});
					
				}  
			} else {
					res.render('index');
			}
})
		 app.post('/newjoineerep', function (req, res) {
			
			if(req.method == "POST"){
				var post  = req.body;
				var s_date= post.start_date;
				var e_date= post.end_date;
			
			
				if (!req) {
				
						message = "fill all the details"
					res.render('index',{message: message, status:'danger'});
			
				} else {
									var sql = "select * from `user_e` where  doj BETWEEN  '"+s_date+"' and '"+e_date+"'";
									console.log(sql);
									var query = db.query(sql, function(err, result) {
										res.render('pages/report/newjoineerep',{page_title:"newjoineerep",data:result});
									});
							
						}  
					} else {
							res.render('index');
					}
		 })
		 app.post('/exitrep', function (req, res) {
			
			if(req.method == "POST"){
				var post  = req.body;
				var s_date= post.start_date;
				var e_date= post.end_date;
			
			
				if (!req) {
				
						message = "fill all the details"
					res.render('index',{message: message, status:'danger'});
			
				} else {
									var sql = "select * from `exit_e` where  exit_date BETWEEN  '"+s_date+"' and '"+e_date+"'";
									console.log(sql);
									var query = db.query(sql, function(err, result) {
										// res.send(result);
										// console.log(result);
										// Object.keys(result).forEach(function(key) {
										// 	var row = result[key];
										// 	console.log(row.sup)
										// });
										//  res.redirect('/newjoineerep');
										res.render('pages/report/exitwiserep',{page_title:"exitwiserep",data:result});
									});
							
						}  
					} else {
							res.render('index');
					}
		 })
		 // restApi
			app.post('/hrisrep', function (req, res) {
				// fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
				// 	console.log( data );
				// 	res.end( data );
				// });
				if(req.method == "POST"){
					var post  = req.body;
					var s_date= post.start_date;
				
				
						if(!post.start_date){
							return res.status(400).send('Missing url parameter start date');
						}else{
							var sql = "select * from `exit_e` where  exit_date = '"+s_date+"' ";
											console.log(sql);
											var query = db.query(sql, function(err, result) {
												
												res.render('pages/report/hrisrep',{page_title:"hrisrep",data:result});
											
											});
						}
					}
			})
			app.post('/Movementrep', function (req, res) {
			
				if(req.method == "POST"){
					var post  = req.body;
					var s_date= post.start_date;
					var e_date= post.end_date;
				
				
					if (!req) {
					
							message = "fill all the details"
						res.render('index',{message: message, status:'danger'});
				
					} else {
										var sql = "select * from `movement_e` where  movement_date BETWEEN  '"+s_date+"' and '"+e_date+"'";
										console.log(sql);
										var query = db.query(sql, function(err, result) {
											// res.send(result);
											// console.log(result);
											// Object.keys(result).forEach(function(key) {
											// 	var row = result[key];
											// 	console.log(row.sup)
											// });
											//  res.redirect('/newjoineerep');
											res.render('pages/report/movewiserep',{page_title:"movewiserep",data:result});
										});
								
							}  
						} else {
								res.render('index');
						}
			 })
		 app.post('/reset-password', function (req, res) {
			
			if(req.method == "POST"){
				var post  = req.body;
				var email= post.email;
			
			
				if (!req) {
				
						message = "fill all the details"
					res.render('index',{message: message, status:'danger'});
			
				} else {
					let transporter = nodeMailer.createTransport({
						host: 'smtp.googlemail.com',
						port: 465,
						secure: true,
						auth: {
							user: 'sidhiagra',
							pass: 'sidhi@123'
						}
					});
					//fs.readFile("./attachment.txt", function (err, data) {
					let mailOptions = {
						from: '"sidhi gupta" <sidhiagra@gmail.com>', // sender address
						to: req.body.email, // list of receivers
						//email: req.body.email, // Subject line
						//phone: req.body.phone, // Subject line
						subject: "Reset Your Password", // Subject line
						text: req.body.body, // plain text body
						html: 'Set your password <button>Reset Password</button>', // html body
						//attachments: [{'filename': 'attachments.txt'}]
					};
					//});
				
					transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							return console.log(error);
						}
						//console.log('Message %s sent: %s', info.messageId, info.response);
							res.redirect('/');
						});
							
						}  
		 } else {
				res.render('index');
		 }
			
		
		 })

		 const courses =[
			 {id:'1',name:'cybersecurity'},
			 {id:'2',name:'hacking'},
			 {id:'3',name:'ccna'},
		 ];	
		 app.get('/api/courses',function(req,res){
			res.send('HEllo World!!');
		 });
		 app.get('/api/courses/:id',function(req,res){
			res.send(courses);
		});
		app.post('/api/courses/:id',function(req,res){
			const schema = {
              name: Joi.string().min(3).required()
			};
			const result = Joi .validate(req.body,schema);
			if(result.error){
				return	res .status(400).send(result.error.details[0].message);
			   }
			// if(!req.body.name || req.body.name.length < 3){
			//  return	res .status(400).send('Name is required and lenth must be upto 3 characters');
			// }
			const course = {
			 id:course.length + 1,
			 name:req.body.name
			};
			courses.push(course);
			res.send(course);
		});
		app.put('/api/courses/:id',function(req,res){
			res.send('HEllo World!!');
		});
		app.delete('/api/courses/:id',function(req,res){
			res.send('HEllo World!!');
		});
};



