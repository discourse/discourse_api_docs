require 'json'
require 'json_schema_ref_parser'

def read_yml_file(file)
  #yml_file = File.open(file, 'r')
  #yml = yml_file.read
  #yml_file.close
  #YAML::load(yml)
  YAML.load_file(file)
end

def write_json_file(json)
  File.open('openapi.json', 'w') { |file| file.write(json) }
end

schema = read_yml_file('openapi.yml')
result = JsonSchemaRefParser::RefParser.dereference(schema)
write_json_file(JSON.pretty_generate(result))
