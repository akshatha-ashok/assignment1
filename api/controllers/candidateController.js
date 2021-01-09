const cm = require('../models/candiateModel');
const candidateModel = cm.Candidate;
const xls = require('read-excel-file/node'); 
var validator  = require('validator');

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex  = /^[a-zA-Z ]*$/;
const numberRegex = /^[0-9]*$/;
const commaRegex = /^[a-zA-Z\s]+\,[a-zA-Z\s]+$/;

exports.validateInputFile = function(path,callback){
    console.log("in controller");
    var err;
    var name;
    var email;
    var phone;
    var ctc;
    var unit;
    var experience;
    var ctcType;
    var location;
    var companyName;
    var experience;
    var ctcCurrency;    
    var result;
    var done = false;
    try{
      
    xls(path).then((rows) =>{
      
       let candidates = [];    
       for (i in rows){
           if(i>0){ 

              name = rows[i][0];
               email = rows[i][7];
               phone = rows[i][8];
               companyName = rows[i][2];
               experience = rows[i][3];
               ctc = rows[i][5];
               location = rows[i][10];
               ctcCurrency = rows[i][4]; 
              ctcType = rows[i][6];
               
               if(!nameRegex.test(name)) {
                err = "Aborting upload : Invalid Name for Candidate : "+name;
                return callback(err);
                
              }

              if(!commaRegex.test(location)) {
                err = "Aborting upload : Invalid location for Candidate : "+name;
                return callback(err);
                
              }
              
               if(!validator.isEmail(email)) {
                err = "Aborting upload : Invalid Email for Candidate : "+name;
                return callback(err);
                
              }
              if(!validator.isNumeric(String(phone))) {
                err = "Aborting upload : Invalid Phone Number for Candidate : "+name;
                return callback(err);
                
              }
              if(!validator.isNumeric(String(experience))) {
                err = "Aborting upload : Invalid experience for Candidate : "+name;
                return callback(err);
                
              }
              if(!validator.isNumeric(String(ctc))) {
                err = "Aborting upload : Invalid CTC for Candidate : "+name;
                return callback(err);
                
              }
              if(!validator.isIn(ctcCurrency, ['INR','USD','EUR'])) {
                err = "Aborting upload : Invalid currency for Candidate : "+name;
                return callback(err);
                
              }
              if(ctcCurrency=='INR'){
                if(!validator.isIn(ctcType, ['LAKHS','CRORES'])) {
                  err = "Aborting upload : Invalid currency Type for Candidate : "+name;
                  return callback(err);
                  
                }

              }else{
                if(!validator.isIn(ctcType, ['THOUSAND','MILLION'])) {
                  err = "Aborting upload : Invalid currency Type for Candidate : "+name;
                  return callback(err);
                }

              }
              
              result = cm.query(phone) ;
              console.log(result);
              if(!result){
                  let candidate = {name:rows[i][0], designation: rows[i][1],Company : rows[i][2],
                    experience : rows[i][3], ctc : rows[i][4], currency:rows[i][5], 
                    ctctype: rows[i][6], email : rows[i][7],phone: rows[i][8],
                     linkedin : rows[i][9],location:rows[i][10] };
                     candidates.push(candidate); 
              }else{
                err = "Aborting upload : Candidate Already Present : "+name;
                  return callback(err);
              }
              

 
             
           }
       }
       if(!candidates){
        err = "Aborting upload : Nothing to Insert";
        return callback(err);
       }else{
        
         console.log(candidates);
        cm.insert(candidates);
        return callback('Completed!');
       }
    

    }
    
    );
    
}catch(err){
  console.log("in errror 1");
  return err;
}
if(done){
  return "Success";
}

};