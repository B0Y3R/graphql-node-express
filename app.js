const express = require('express');
const  { graphqlHTTP } = require('express-graphql');
const articleSchema = require('./graphql/schema/articleSchema');
const graphqlResolvers = require('./graphql/resolvers');
const mongoose = require("mongoose")

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema: articleSchema,
        rootValue: graphqlResolvers,
        graphiql: true,
    })
)

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nomad-dev-cluster.xf0f7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(uri, options)
  .then(() => app.listen(3000, console.log("Server is running")))
  .catch(error => {
    throw error
  })