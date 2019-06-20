var http = require("http");
nodeMailer = require('nodemailer');
var validator = require('validator');
 
validator.isEmail('foo@bar.com');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}));

const validatePhoneNumber = require('validate-phone-number-node-js');
const result = validatePhoneNumber.validate('+8801744253089');
var fs = require('fs'); 
var port = 4088;
var server = http.createServer(function(request, response) {
    var url = request.url;
    switch(url){
        case '/home':
            getPageFromUrl('home.html','text/html',response);
            break;
        default:
            response.writeHead('200',{"Content-Type": "text/html"});
            response.end();
    }
  
   
  
    /*
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<!DOCTYPE>");
    response.write("<html>");
    response.write("<head>");
    response.write("<title>"+url+"</title>");
    response.write("</head>");
    response.write("<body>");
    response.write();
    response.write("</body>");
    response.write("</html>");
    response.end();
    
    fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    fs.unlink('mynewfile1.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });*/ 
});
// const contact = require('./app/routes/contact');
// app.use('/contact', contact);
// // If an incoming request uses
// // a protocol other than HTTPS,
// // redirect that request to the
// // same url but with HTTPS
// const forceSSL = function () {
//   return function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       return res.redirect(
//         ['https://', req.get('Host'), req.url].join('')
//       );
//     }
//     next();
//   }
// }

// // Instruct the app
// // to use the forceSSL
// // middleware
// app.use(forceSSL());
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   if ('OPTIONS' == req.method) {
//     res.sendStatus(200);
//     } else {
//       next();
//     }

// });

// // For all GET requests, send back index.html
// // so that PathLocationStrategy can be used
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname + '/majeni/dist/majeni/index.html'));
// });

// server.listen(port);
// console.log("Server is listening on port no: "+port);

// function getPageFromUrl(path,contentType,res){
//     fs.readFile('demofile1.html', function(err, data) {
//         if(err){
//             res.writeHead(400,{'Content-Type': contentType});
//             res.end('500 -Internal Server Error');
//         }
//         else{
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(data);
//             res.end();
//         }
//     });
// }

