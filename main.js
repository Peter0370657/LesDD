//test
var request = require("request");
var dal = require('./storage.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";   // moet erbij zodat het geen problemen vormt om een self-signed cert te negeren.

var beginlink = "https://web-ims.thomasmore.be/datadistribution/API/2.0";

var Drone = function (id, name, mac_address, location, last_packet_date, files, files_count) {
    this._id = id;
    this.name = name;
    this.mac_address = mac_address;
    this.location = location;
    this.last_packet_date = last_packet_date;
    this.files = files;
    this.files_count = files_count;
};
var Content = function (id, mac_address, datetime, rssi, ref, url, droneId, fileId) {
    this._id = id;
    this.mac_address = mac_address;
    this.datetime = datetime;
    this.rssi = rssi;
    this.ref = ref;
    this.url = url;
    this.droneId = droneId;
    this.fileId = fileId;
};
var File = function (id, date_first_record, date_last_record, date_loaded, contents_count, url, ref, contents, droneId) {
    this._id = id;
    this.date_first_record = date_first_record;
    this.date_last_record = date_last_record;
    this.date_loaded = date_loaded;
    this.contents_count = contents_count;
    this.url = url;
    this.ref = ref;
    this.contents = contents;
    this.droneId = droneId;
};
var settings = function (url) {
    this.url = beginlink + url;
    this.method = "GET";
    this.qs = {format: 'json'};
    this.headers = {
        authorization: "Basic aW1zOno1MTJtVDRKeVgwUExXZw=="
    };
};

var Drone_Settings = new settings("/drones?format=json");

dal.ClearFile();
dal.ClearDrone();
dal.ClearContent();


request(Drone_Settings, function (error, response, DronesString) {
    var drones = JSON.parse(DronesString);
    console.log(drones);
    drones.forEach(function (drone) {
        var drone_setting = new settings("/drones/" + drone.id + "?format=json");
        request(drone_setting, function (error, response, DroneString) {
            var DroneDetails = JSON.parse(DroneString);
            dal.InsertDrone(
                    new Drone(
                            DroneDetails.id,
                            DroneDetails.name,
                            DroneDetails.mac_address, // moet natuurlijk ook hier en niet alleen in prototypes aangepast worden
                            DroneDetails.location,
                            DroneDetails.last_packet_date,
                            DroneDetails.files,
                            DroneDetails.files_count
                            )
                    ); // sluit line 62
            var File_Settings = new settings("/files?drone_id.is=" + drone.id + "&format=json&date_loaded.greaterOrEqual=2016-12-01T00:00:00"); // hiermee krijgen we hopelijk alleen de gegevens die verzameld werden vanaf 1 december 
            request(File_Settings, function (err, response, filesString) {
                var files = JSON.parse(filesString);
                files.forEach(function (file) {
                    var File_de_Settings = new settings("/files/" + file.id + "?format=json");
                    request(File_de_Settings, function (err, response, fileDetailString) {
                        try {
                            var fileDetail = JSON.parse(fileDetailString);

                            dal.InsertFile(
                                    new File(
                                            fileDetail.id,
                                            fileDetail.date_loaded,
                                            fileDetail.date_first_record,
                                            fileDetail.date_last_record,
                                            fileDetail.url,
                                            fileDetail.ref,
                                            fileDetail.contents,
                                            fileDetail.contents_count,
                                            drone.id
                                            ));

                            var contentsSettings = new settings("/files/" + file.id + "/contents?format=json");
                            request(contentsSettings, function (error, response, contentsString) {
                                try {
                                    var contents = JSON.parse(contentsString);
                                    //console.log(contents);

                                    contents.forEach(function (content) {
                                        var contentDetailSetting = new settings("/files/" + file.id + "/contents/" + content.id + "?format=json");
                                        request(contentDetailSetting, function (error, response, contentDetailString) {
                                            try {
                                                var contentDetail = JSON.parse(contentDetailString);
                                                console.log(contentDetail);
                                                dal.InsertContent(
                                                        new Content(
                                                                contentDetail.id,
                                                                contentDetail.mac_address,
                                                                contentDetail.datetime,
                                                                contentDetail.rssi,
                                                                contentDetail.url,
                                                                contentDetail.ref,
                                                                drone.id,
                                                                file.id
                                                                ));
                                            } catch (e) {
                                                console.log(e);
                                            }

                                        });
                                    });
                                } catch (e) {
                                    console.log(e);
                                }
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    });
                });
            });
        });
    });
});
