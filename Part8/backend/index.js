const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const http = require("http");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws"); //No longer actively maintained. Its successor is a library called graphql-ws.
const DataLoader = require("dataloader"); //Used to solve the N+1 problem
const _ = require("lodash");

const User = require("./models/userModel");
const Book = require("./models/bookModel");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.SECRET;

console.log("connecting to MongoDB");

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error: failed to connect to MongoDB");
  });

mongoose.set("debug", true);

// const batchBookAuthors = async (ids) => {
//   console.log("ids", ids);
//   const booksByAuthors = await Book.find({ author: { $in: ids } });
//   console.log("booksByAuthor", booksByAuthors);
//   const bookIds = _.keyBy(booksByAuthors, "_id");
//   console.log("bookIds", bookIds);
//   const idsToReturn = ids.map((id) => bookIds[id]);
//   console.log("idsToReturn", idsToReturn);
// };

const authorLoader = new DataLoader((authorIds) => {
  const result = Book
    //Get books by IDs from the list of book IDs passed as parameter, with a single query
    .find({ author: { $in: authorIds } })
    .then((books) => {
      //Convert list of books into an array with objects containing keys corresponding to author IDs
      const booksByAuthorId = _.groupBy(books, "author");
      //Map the desired books according to their IDs and return them for the resolver
      return authorIds.map((authorId) => booksByAuthorId[authorId]);
    });
  return result;
});

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "" }
  );

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      let currentUser;
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        currentUser = await User.findById(decodedToken.id);
      }

      return {
        currentUser,
        loaders: {
          // bookAuthors: new DataLoader((keys) => batchBookAuthors(keys)),
          authorLoader,
        },
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    introspection: true,
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  httpServer.listen(PORT, () => console.log(`Server is now running`));
};

start();
