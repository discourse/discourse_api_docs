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

fs.readFile(inputFile, 'utf8', function(err, data) {
  if (err) throw err;
  var json = JSON.parse(data);
  var schema = gen(json);
  delete schema.required;

  //TODO: redoc doesn't like the yml when `inline > 2` (2nd argument in stringify command)
  //apparently this is because there are some properties without types on them(they should just be set to `null`)
  var yml = yaml.stringify(schema, 2, 2);

  fs.writeFile(outputFile, yml, function(err) {
    if (err) return console.log(err);
    console.log('converted json response to yml schema');
  });

});

