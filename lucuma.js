var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
// var https = require('https');  ////////////////////////
// var fs = require('fs');        ////////////////////////
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var options = {
      socketOptions: {
                      autoReconnect:true,
                      noDelay: true,
                      keepAlive: 0,
                      connectTimeoutMS:0,
                      socketTimeoutMS:0
                     },
      reconnectTries:30,
      reconnectInterval: 1000,
      monitoring:true,
      haInterval:10000
};

mongoose.connect(config.database, options , function(err){
//mongoose.connect(config.database, { server: { reconnectTries: Number.MAX_VALUE } }, function(err){
//mongoose.connect(config.database, function(err){
  if (err) {
    console.log('No se pudo conectar....');
    console.log(err);
    //mongoose.connect(config.database, options );
    //setTimeout(tryReconnect, 500)
    //setTimeout(connectWithRetry, 5000);
  } else {
    console.log('Dgb Exitos, se pudo conectar a mongo');
  }
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app, express, io);
app.use('/api', api);

app.get('*', function(req, res){
  res.sendFile(__dirname + "/public/app/views/index.html");
})
//////////////////////////////////////////////////////


// var options = {
//     requestCert: true, //This will request the client certificate
//     rejectUnauthorized: true, //This will reject client certificates that are not signed by the CA
//     key: fs.readFileSync(CONFIG.certificates.privateKey),
//     cert: fs.readFileSync(CONFIG.certificates.publicKey),
//     ca: fs.readFileSync(CONFIG.certificates.ca) //This is crucial to ensure only people with the same root CA can connect
// }
// var server = https.createServer(options, app);
// server.on('secureConnection', function (cleartextStream, encryptedStream) {
//     if(!cleartextStream.authorized){
//         console.error("TLS error: " + cleartextStream.authorizationError)
//     }
// })




///////////////////////////////////////////////////////


console.log('puerto:'+config.port);


http.listen(config.port, function(err){
  if (err) {
    console.log('dgb error');

  } else {
    console.log('Escuchando puerto ');
    console.log(config.port);
  }
});
