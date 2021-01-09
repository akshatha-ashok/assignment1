var http = require('http');
var formidable = require('formidable'); 

const cm = require('./api/controllers/candidateController');
var fs = require('fs');






http.createServer(function (req, res) {
    if(req.url== '/fileupload'){
        var file = new formidable.IncomingForm();
       
       try{
        file.parse(req, function (err, fields, files) {        
        var oldpath = files.filetoupload.path;
        var newpath = 'C:/Users/aknagali/Node JS/public/assignment/uploads/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) res.write(err);;
                   
        }); 
        cm.validateInputFile(newpath,function(response){
          console.log(response);
          if(response.indexOf('Aborting') !== -1){
          res.write(response);
          }else{
            res.write("Candidates uploaded Successfully");
          }
          res.end();
        }
        );
        
        
        });
      }
      catch(err){
        console.log("in error");
        res.write(err); 
        res.end();
      }
    }

    
    else{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();   
    }
    
  }).listen(5566); 
