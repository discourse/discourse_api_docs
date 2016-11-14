# Discourse API Documentation

To view the the Discourse API Documentation you can visit:

  https://oblakeerickson.github.io/discourse_api_docs

Here is an example of the the ReDoc site looks like:

![redoc](https://cloud.githubusercontent.com/assets/1490496/20266324/e818b49e-aa32-11e6-8390-242f0f155cb7.gif)

### Postman

In addition to the docs site, you can also import the postman json files into
[postman](https://www.getpostman.com/) to test making real API calls and see the json output.

Postman files:
  - [environment](https://raw.githubusercontent.com/oblakeerickson/discourse_api_docs/master/postman/discourse_local.postman_environment.json)
  - [collection](https://raw.githubusercontent.com/oblakeerickson/discourse_api_docs/master/postman/discourse.postman_collection.json)

Start by importing the environment json file. After you import it be sure to
change the `base_url`, `api_username`, and `api_key` values to match your
discourse instance.

Now you can import the collection json file and start making API requests.

Here is a demo:

![discourse_postman](https://cloud.githubusercontent.com/assets/1490496/20265862/9478355a-aa30-11e6-98b0-ecf7d2ab9263.gif)

### Contributing

Contributions are welcome! Start by cloning the repo.

To edit the api docs, edit the swagger.yml file not the json file.

To view your changes locally, run:

```
npm install
node server.js
```

Browse to localhost:3001 to see the pretty docs.

Before you push your changes or create a PR convert the yml file to json:

```
node tojson.js
```

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

