var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/booksdb';
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
	listBooks: function (callback) {
		this.connect(null, function (db) {
			db.collection('books').find({}).toArray(function (err, result) {
				db.close();
                                callback(result);
			});
		});
	},
	insertBooks: function (book, callback) {
		this.connect(null, function (db) {
			db.collection('books').insert(book, function (err, result) {
				db.close();
                                callback();
			});
		});
	}
};

module.exports = dal;