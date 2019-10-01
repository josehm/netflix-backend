//require("dotenv").config();
const {db} = require('./config/index');

import { ApolloServer } from 'apollo-server';
import mongoose from "mongoose";

import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema.graphql';
import { getContext, AuthDirective } from './actions/authActions';



mongoose.connect( db.URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true// Se agrego para que funcione findOneAndUpdate
  }
);

const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Error de conexion !!'));
mongoDB.on('open', () => console.log('BD conectada !!'));


const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
      AuthDirective: AuthDirective
    },
    context: async ({ req }) => getContext(req),
    introspection: true,
    playground: true,
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

export default server;