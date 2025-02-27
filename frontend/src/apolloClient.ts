import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, concat } from "@apollo/client";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });


const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});
export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
export default client;