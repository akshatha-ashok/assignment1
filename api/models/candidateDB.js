
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},function(err, db) {
  if (err) throw err;
  var dbo = db.db("candidatedb");
  dbo.createCollection("candidate", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  
});