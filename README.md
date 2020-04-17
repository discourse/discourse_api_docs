# Discourse API Documentation

To view the the Discourse API Documentation you can visit:

  http://docs.discourse.org/

### Contributing

Contributions are welcome! Start by cloning the repo.

To edit the api docs, edit the openapi.yml file not the json file.

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

