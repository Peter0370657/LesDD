// >$ npm install request --save 
var request = require("request"); 
var dal = require('./storage.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";   // moet erbij zodat het geen problemen vormt om een self-signed cert te negeren.


console.log("Hello World!");