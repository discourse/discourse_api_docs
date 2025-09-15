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

// Simple JSON schema generator replacement
function generateSchema(obj) {
  if (obj === null) {
    return { type: "null" };
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return { type: "array", items: {} };
    }
    return {
      type: "array",
      items: generateSchema(obj[0])
    };
  }

  if (typeof obj === "object") {
    var schema = { type: "object", properties: {} };
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        schema.properties[key] = generateSchema(obj[key]);
      }
    }
    return schema;
  }

  if (typeof obj === "string") {
    return { type: "string" };
  }

  if (typeof obj === "number") {
    return { type: "number" };
  }

  if (typeof obj === "boolean") {
    return { type: "boolean" };
  }

  return { type: "string" }; // fallback
}

var addTypeIfEmptyObject = function(obj) {
  for(var i in obj) {
    if (typeof obj[i] === "object") {
      if (Object.keys(obj[i]).length === 0) {
        obj[i] = {type: "object"};
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
  var schema = generateSchema(json);
  delete schema.required;


  //there are some properties without types on them(they should just be set to `null`)
  addTypeIfEmptyObject(schema.properties);

  var yml = yaml.stringify(schema, 16, 2);

  fs.writeFile(outputFile, yml, function(err) {
    if (err) return console.log(err);
    console.log('converted json response to yml schema');
  });

});

