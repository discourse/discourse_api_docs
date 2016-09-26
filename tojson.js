var yaml = require('yamljs');
var fs = require('fs');

var ymlFile;
fs.readFile('swagger.yml', 'utf8', function(err, data) {
  if (err) throw err;
  var json = yaml.parse(data);
  fs.writeFile('swagger.json', JSON.stringify(json), function(err) {
    if (err) return console.log(err);
    console.log('yml converted to json');
  });
});

