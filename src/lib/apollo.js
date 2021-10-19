import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";

const uri = import.meta.env.VITE_API_URI;

// Http Link Access
const httpLink = createHttpLink({
  uri
});

const initialStateCharacters = {
  info: {
    next: 1
  },
  results: []
};

// Cache instance
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: false,
          merge(existing = initialStateCharacters, incoming) {
            const result = { ...existing, ...incoming, info: { ...incoming.info }, results: [...existing.results.slice(), ...incoming.results] };
            return result;
          }
        }
      }
    }
  }
});

// Apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});


export default apolloClient;
