// >$ npm install request --save 
var request = require("request"); 
var dal = require('./storage.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";   // moet erbij zodat het geen problemen vormt om een self-signed cert te negeren.



var Drone = function (){
    this._id = id;
    this.name = name;
    this.mac = mac;
    this.location = location;
};
var Content = function (){
    this._id = id;
    this.mac_address = mac_address;
    this.datetime = datetime;
    this.rssi = rssi;
    this.ref = ref;
    this.url = url
};
var File = function (){
    this._id = id;
    this.date_first_record = date_first_record;
    this.date_last_record = date_last_record;
    this.date_loaded = date_loaded;
    this.contents_count = contents_count;
};



/*
dal.ClearFile();
dal.ClearDrone();
dal.ClearContent();
*/


console.log("Hello World!"); 