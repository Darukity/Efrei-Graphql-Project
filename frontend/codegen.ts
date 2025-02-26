import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  //schema: "https://rickandmortyapi.com/graphql",
  //schema: "http://localhost:4000/graphql"
  schema: "schema.graphql", // Utilisation du fichier local
  documents: ["src/**/*.tsx"], // Fichiers où se trouvent tes queries
  generates: {
    "src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ],
    },
  },
};

export default config;
