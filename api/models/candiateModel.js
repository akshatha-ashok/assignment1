var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.query = function(queryString){
    
   MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("candidatedb");
  
  dbo.collection("candidate").find({phone:queryString}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
}); 

return result;
}

exports.insert = function(candidateObj){
    
     MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     var dbo = db.db("candidatedb"); 
     
     
    console.log(candidateObj);
       dbo.collection("candidate").insertMany(candidateObj, function(err, result) {     
       if (err) throw err;
       console.log(result);
       db.close();
     }); 
   }); 
  
   }