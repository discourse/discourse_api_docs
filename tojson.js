var yaml = require('yamljs');
var fs = require('fs');
var refParser = require('json-schema-ref-parser');

var ymlFile;
fs.readFile('swagger.yml', 'utf8', function(err, data) {
  if (err) throw err;
  var json = yaml.parse(data);
  refParser.dereference(json, function(err, schema) {
    if (err) {
      console.error(err);
    } else {
      fs.writeFile('swagger.json', JSON.stringify(schema, null, 2).concat('\n'), function(err) {
        if (err) return console.log(err);
        console.log('yml converted to json');
      });
    }
  });
});
