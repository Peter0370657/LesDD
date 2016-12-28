// >$ npm install request --save 
var request = require("request"); 
var dal = require('./storage.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";   // moet erbij zodat het geen problemen vormt om een self-signed cert te negeren.

var beginlink = "https://web-ims.thomasmore.be/datadistribution/API/2.0";

var Drone = function (id, name, mac, location, last_packet_date, files, files_count){
    this._id = id;
    this.name = name;
    this.mac = mac;
    this.location = location;
    this.last_packet_date= last_packet_date;
    this.files = files;
    this.files_count = files_count;
};
var Content = function (id, mac_address, datetime, rssi, ref, url, droneId, fileId){
    this._id = id;
    this.mac_address = mac_address;
    this.datetime = datetime;
    this.rssi = rssi;
    this.ref = ref;
    this.url = url;
    this.droneId = droneId;
    this.fileId = fileId;
};
var File = function (id, date_first_record, date_last_record, date_loaded, contents_count, url, ref, contents, droneId){
    this._id = id;
    this.date_first_record = date_first_record;
    this.date_last_record = date_last_record;
    this.date_loaded = date_loaded;
    this.contents_count = contents_count;
    this.url = url;
    this.ref= ref;
    this.contents = contents;
    this.droneId = droneId;
};

var settings  = function (url){
    this.url = beginlink+ url ;
    this.method = "GET";
    this.qs = {format: 'json'};
    this.headers = {
        authorization: "Basic aW1zOno1MTJtVDRKeVgwUExXZw=="
    };
};



/*
dal.ClearFile();
dal.ClearDrone();
dal.ClearContent();
*/


console.log("Hello World!"); 