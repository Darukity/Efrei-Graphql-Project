import {CodegenConfig} from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: './src/schema.ts',
  generates: {
    './src/types.ts': {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: './context#Context',
        mappers: {
          Article: './src/models#ArticleModel',
          Comment: './src/models#CommentModel',
          Like: './src/models#LikeModel',
        }
      }
    }
  }
}
 
export default config