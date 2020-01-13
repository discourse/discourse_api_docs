var express = require('express');
var app = express();
var yaml = require('yamljs');
var fs = require('fs');
var refParser = require('json-schema-ref-parser');
var args = process.argv.slice(2);

app.get('/',function(req,res){
  res.sendFile(__dirname + '/local.html');
});

app.get('/swaggerfile', function(req,res){
  if (args[0] == "json") {
    fs.readFile('swagger.json', 'utf8', function(err, data) {
      var json = JSON.parse(data);
      if (err) throw err;
      refParser.dereference(json, function(err, schema) {
        if (err) {
          console.error(err);
        } else {
          res.send(schema);
        }
      });
    });
  } else {
    fs.readFile('swagger.yml', 'utf8', function(err, data) {
      if (err) throw err;
      var json = yaml.parse(data);
      refParser.dereference(json, function(err, schema) {
        if (err) {
          console.error(err);
        } else {
          res.send(schema);
        }
      });
    });
  }
});

app.listen(3001, function() {
  console.log("listening on http://localhost:3001");
});
