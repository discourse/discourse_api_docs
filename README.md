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

Then you can commit your changes and create a PR. Once it merges, the Publish
Docs workflow builds docs.discourse.org from openapi.json and publishes it to
GitHub Pages.

### The published site

docs.discourse.org is built with [sourcey](https://github.com/sourcey/sourcey)
from openapi.json and the tools of the Discourse MCP server. To see it as it
will be published:

```
npm install
npm run docs
```

`sourcey.config.ts` sets it up. `discourse.overlay.yaml` groups the API's
sections under three headings, and `discourse.anchors.json` keeps every link
into the previous page (`#tag/Posts/operation/createTopicPostPM` and the rest)
landing on its endpoint.

The MCP Reference is a snapshot of the tools, resources and prompts the server
lists (`discourse.mcp.json`), in the toolsets it declares
(`discourse-mcp.groups.json`). Refresh it after a release of `@discourse/mcp`:

```
npm run mcp:snapshot
```

Anything new the snapshot brings is listed after the toolsets until
`discourse-mcp.groups.json` names its section, and the build says which.

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

