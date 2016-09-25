var express = require('express');
var app = express();
var yaml = require('yamljs');
var fs = require('fs');

app.get('/',function(req,res){
  res.sendFile(__dirname + '/local.html');
});

app.get('/swaggerfile', function(req,res){
  var ymlFile;
  fs.readFile('swagger.yml', 'utf8', function(err, data) {
    if (err) throw err;
    var json = yaml.parse(data);
    res.send(json);
  });
});

app.listen(3001, function() {
  console.log("listening on http://localhost:3001");
});
