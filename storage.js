var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/prober';
// mongo in nodeJs: http://mongodb.github.io/node-mongodb-native/2.2/
// mongo API : http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html

var dal = {

	connect: function (err, result) {
		MongoClient.connect(url, function (error, db) {
			if (error)
				throw new Error(error);
			console.log("Connected successfully to server");
			result(db);
		});
	},
        ClearDrone: function (call){
            this.connect(null, function (db){
                db.collection('drones').drop(function (err, result){
                    db.close();
                });
            });
        },
        InsertDrone: function (drone, callback){
            this.connect(null, function(db){
                db.collection('drones').insert(drone, function (err, result){
                    db.close();
                    console.log("drone inserted succesfully");
                });
            });
        }, 
        ClearDrone: function (call){
            this.connect(null, function (db){
                db.collection('drones').drop(function (err, result){
                    db.close();
                });
            });
        },
        InsertDrone: function (drone, callback){
            this.connect(null, function(db){
                db.collection('drones').insert(drone, function (err, result){
                    db.close();
                    console.log("drone inserted succesfully");
                });
            });
        }, 
        ClearDrone: function (call){
            this.connect(null, function (db){
                db.collection('drones').drop(function (err, result){
                    db.close();
                });
            });
        },
        InsertDrone: function (drone, callback){
            this.connect(null, function(db){
                db.collection('drones').insert(drone, function (err, result){
                    db.close();
                    console.log("drone inserted succesfully");
                });
            });
        }, 
        
        
        
        
        
};

module.exports = dal;