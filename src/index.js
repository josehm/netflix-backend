//require("dotenv").config();
const {db, PORT} = require('./config/index')

import { ApolloServer } from 'apollo-server'
import mongoose from "mongoose"

import resolvers from './graphql/resolvers'
import typeDefs from './graphql/schema'
import { getContext, AuthDirective } from './actions/authActions'



mongoose.connect( db.URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true// Se agrego para que funcione findOneAndUpdate
  }
)

const mongoDB = mongoose.connection
mongoDB.on('error', console.error.bind(console, "Error: Couldn't connect with the database!!"))
mongoDB.on('open', () => console.log('Database connected!!'))


const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
      AuthDirective: AuthDirective
    },
    context: async ({ req }) => getContext(req),
    introspection: true,
    playground: true,
})

server.listen(PORT || 4000).then(({ url }) => {
  console.log(` 🎮  Playground ready at ${url} `)
  console.log(` 🚀  Server ready at ${url}graphql `)
})

export default server;