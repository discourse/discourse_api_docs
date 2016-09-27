var gen = require('json-schema-generator');
var yaml = require('yamljs');

var json = {
  "id": 20,
  "name": ""
};

var schema = gen(json);
var yml = yaml.stringify(schema, 2);
console.log(yml);

