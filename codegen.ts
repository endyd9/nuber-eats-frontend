import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["src/**/*.{tsx,ts,js,jsx}", "!src/gql/__generated__/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      overwrite: true,
    },
  },
};

export default config;
