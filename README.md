# Discourse API Documentation

To view the the Discourse API Documentation you can visit:

  https://oblakeerickson.github.io/discourse_api_docs

### Contributing

Contributions are welcome! Start by cloning the repo.

*This can probably be easily converted to a rack/sinatra app instead of
node.js for development*

To edit the api docs, edit the swagger.yml file not the json file.

To view your changes locally, run:

```
npm install
node server.js
```

Browse to localhost:3001 to see the pretty docs.

Before you push your changes or create a PR convert the yml file to json:

```
yaml2json swagger.yml > swagger.json
```

Then you can commit your changes and create a PR. This is because we are using
github pages to host the doc website.
