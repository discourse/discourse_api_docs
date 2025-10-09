const { openApiToBruno } = require("@usebruno/converters");
const { readFile, writeFile } = require("fs/promises");

async function convertOpenApiToBruno(inputFile, outputFile) {
  try {
    const jsonContent = await readFile(inputFile, "utf8");

    const openApiSpec = JSON.parse(jsonContent);

    const brunoCollection = openApiToBruno(openApiSpec);

    await writeFile(outputFile, JSON.stringify(brunoCollection, null, 2));
    console.log("OpenAPI JSON conversion successful!");
  } catch (error) {
    console.error("Error during OpenAPI JSON conversion:", error);
  }
}

convertOpenApiToBruno("openapi.json", "bruno-collection.json");
