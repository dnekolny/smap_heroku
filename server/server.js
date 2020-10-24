const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs.js');

mongoose.connect("mongodb://localhost:27017/smap", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {

    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
    //app.use(cors());

    server.applyMiddleware({ app });

    // app.use('/graphql', graphqlHTTP({
    //     schema: schema,
    //     rootValue: resolvers,
    //     graphiql: true
    // }))

    app.listen(4000, () => {
        console.log('GraphQL server is running on port 4000!')
    });

});