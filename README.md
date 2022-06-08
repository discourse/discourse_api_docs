# Discourse API Documentation

![automatic updates](https://github.com/discourse/discourse_api_docs/actions/workflows/update_docs.yml/badge.svg)

To view the the Discourse API Documentation you can visit:

  https://docs.discourse.org/

### Contributing

Contributions are welcome! Start by cloning this repo as well as the
[discourse](https://github.com/discourse/discourse) repo.


The API docs are automatically generated from the discourse repo using a tool
called rswag.

You can generate the openapi.yml file that is located in this repo by running
this command from inside of your discourse repo directory:


```
rake rswag:specs:swaggerize && cp openapi/openapi.yaml ~/code/discourse_api_docs/openapi.yml
```

Please do not manually edit the openapi.yml or openapi.json files located in
this repo. These files must be edited from the rswag files located in

https://github.com/discourse/discourse/tree/main/spec/requests/api

To view your changes locally, run:

```
npm install
node server.js
```

Browse to http://localhost:3001 to see the pretty docs.

Before you push your changes or create a PR convert the yml file to json:

```
node tojson.js
```

To verify converting to json worked correctly, please run:

```
node server.js json
```

which will load the json file directly instead of live converting the yml file
to json. Now browse to http://localhost:3001 and verify your changes still look
okay.

Then you can commit your changes and create a PR. This is because we are using
github pages to host the static doc website.

### Automatic openapi.yml generation

If you are changing multiple API specs in the core Discourse repo, then you can use the `bundle exec rake autospec:swagger` rake task to watch for changes to files in the `spec/requests/api` directory. When a change is detected the swaggerize rake task command is run, the openapi.yml file is generated, and node tojson.js is run.

This can all be done while the local API docs server is running for live updates every time API spec files are changed.

### Schema Generator

To aid in writing the yml responses in the swagger.yml file use this command to
convert actual json responses to a yml schema file:

```
node toschema.js <input file> <output file>
```

Example:

```
node toschema.js responses/topics/topic_respones.json definitions/topics/topic_response.yml
```

This will convert a json response into json schema and then convert the schema
to yml.

