require('dotenv').config();
require('./database');

const { ApolloServer } = require('apollo-server');

const auth = require('./auth');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: auth
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
