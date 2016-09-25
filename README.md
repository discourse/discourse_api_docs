# discourse_api_docs

** This can probably be easily converted to a rack/sinatra app instead of
node.js **

To edit the api docs, edit the swagger.yml file not the json file.

To view your changes locally, run:

```
npm install
node server.js
```

Browse to localhost:3001 to see the pretty docs.

Before you push your changes or create a PR convert the yml file json:

```
yaml2json swagger.yml > swagger.json
```

Then you can commit your changes and create a PR. This is because we are using
github pages to host the doc website.
