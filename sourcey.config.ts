import { defineConfig, mcp, openapi } from "sourcey";
import anchors from "./discourse.anchors.json";
import groups from "./discourse-mcp.groups.json";

// docs.discourse.org: the API reference from openapi.json, which the Update Docs workflow
// regenerates from discourse/discourse, and beside it the tools of the Discourse MCP server
// (discourse/discourse-mcp), under the toolsets it declares.
export default defineConfig({
  name: "Discourse API",
  siteUrl: "https://docs.discourse.org",
  // GitHub Pages serves page.html at /page, so pages link to each other that way.
  prettyUrls: "strip",
  logo: { light: "./logo.svg", dark: "./logo-dark.svg" },
  favicon: "./favicon.png",
  theme: { colors: { primary: "#0088cc" } },
  navigation: {
    tabs: [
      {
        id: "api",
        tab: "API Reference",
        slug: "",
        source: openapi({ spec: "./openapi.json", overlays: ["./discourse.overlay.yaml"] }),
        // Every deep link into the previous page (#tag/Posts/operation/createTopicPostPM and the
        // rest) lands on the endpoint it names. The document changes as Discourse does, so a link
        // to an endpoint that has since gone is reported and dropped rather than failing the build.
        anchors,
        anchorUnmatched: "warn",
      },
      { id: "mcp", tab: "MCP Reference", slug: "mcp", source: mcp({ spec: "./discourse.mcp.json", groups }) },
    ],
  },
});
