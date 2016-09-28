var gen = require('json-schema-generator');
var yaml = require('yamljs');
var fs = require('fs');
var inputFile = '';
var outputFile = '';

if (process.argv.length > 3) {
  inputFile = process.argv[2];
  outputFile = process.argv[3];
} else {
  console.log('Please specify input and output files!');
  console.log('node schema.js input.json output.yml');
}

var addTypeIfEmptyObject = function(obj) {
  for(var i in obj) {
    if (typeof obj[i] === "object") {
      if (Object.keys(obj[i]).length === 0) {
        obj[i] = {type: null};
      } else {
        addTypeIfEmptyObject(obj[i]);
      }
    }
  }
  return null;
}

fs.readFile(inputFile, 'utf8', function(err, data) {
  if (err) throw err;
  var json = JSON.parse(data);
  var schema = gen(json);
  delete schema.required;


  //there are some properties without types on them(they should just be set to `null`)
  addTypeIfEmptyObject(schema.properties);

  var yml = yaml.stringify(schema, 16, 2);

  fs.writeFile(outputFile, yml, function(err) {
    if (err) return console.log(err);
    console.log('converted json response to yml schema');
  });

});

