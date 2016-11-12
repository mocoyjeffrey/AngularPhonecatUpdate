function loadPhoneFromDB (){
  var mysql = require('mysql');
  var express = require('express');
  var app = express();


  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "phonecat"
  });
  var port = 3306;
  app.listen(port);
  console.log("Server running on "+port);

  app.get('/', function(req, res){
    //console.log("Hello Express!");
    //res.send("Hello HTML!");
      connection.query("SELECT * FROM phone", function(error,rows,fields){
          if(!!error){
            console.log('Query Bad');
            console.log('Error: '+error);
          }else{
            //console.log('Query Good');
            console.log(res.json(rows));
            //res.send(res.json(rows));
            return res.json(rows);
          }
      })
  });
}