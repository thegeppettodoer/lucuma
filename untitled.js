var https = require('https');
var fs = require('fs');
var express = require('express');

var options = {
    key: fs.readFileSync('/etc/apache2/ssl/server.key'),
    cert: fs.readFileSync('/etc/apache2/ssl/server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};


var app = express();

var server = https.createServer(options, app).listen(3000, function(){
    console.log("server started at port 3000");
});

/////////////



var options = {
    requestCert: true, //This will request the client certificate
    rejectUnauthorized: true, //This will reject client certificates that are not signed by the CA
  key: fs.readFileSync(CONFIG.certificates.privateKey),
  cert: fs.readFileSync(CONFIG.certificates.publicKey),
  ca: fs.readFileSync(CONFIG.certificates.ca) //This is crucial to ensure only people with the same root CA can connect
}
var server = https.createServer(options, app);
// This bit is for testing
server.on('secureConnection', function (cleartextStream, encryptedStream) {
    if(!cleartextStream.authorized){
        console.error("TLS error: " + cleartextStream.authorizationError)
    }
})
// The testing bit ends here
server.listen(443)


























