const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");

const Book = require("./models/bookModel");
const Author = require("./models/authorModel");
const User = require("./models/userModel");

const pubsub = new PubSub();

const JWT_SECRET = "SECRET_KEY";

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.name && !args.genre) {
        return Book.find({});
      }
      // if (args.name) {
      //   return books.filter((book) => book.author === args.name);
      // }
      // return books.filter((book) =>
      //   book.genres.find((genre) => genre === args.genre)
      // );
    },
    allAuthors: async () => Author.find({}),
    currentUser: (root, args, context) => {
      return context.currentUser;
    },
    booksByGenre: async (root, args) => {
      const filter = args.genre;
      const allBooks = await Book.find({});

      const filteredBooks = allBooks.filter((book) => {
        const convertedGenres = book.genres.map((genre) => {
          return genre.toLowerCase();
        });
        if (convertedGenres.includes(filter.toLowerCase())) {
          return { ...book, genres: convertedGenres };
        }
      });
      return filteredBooks;
    },
  },
  Book: {
    author: async (root) => {
      const findAuthor = await Author.findById(root.author);
      return {
        name: findAuthor.name,
        born: findAuthor.born,
        bookCount: findAuthor.bookCount,
        id: findAuthor._id,
      };
    },
  },
  Author: {
    bookCount: async (author, _args, { loaders }) => {
      //   const count = await Book.find({ author: root.id });
      //   return count.length;
      const booksWritten = await loaders.authorLoader.load(author.id);
      return booksWritten.length;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      //   if (!currentUser) {
      //     throw new AuthenticationError("user not authenticated");
      //   }

      const newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
      });

      const validate = newBook.validateSync();
      if (validate) {
        throw validate;
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        newAuthor = new Author({ name: args.author, bookCount: 1 });
        try {
          author = await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args.author });
        }
      }

      newBook.author = author._id;

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

      return newBook.save();
    },
    addAuthor: async (root, args, { currentUser }) => {
      //   if (!currentUser) {
      //     throw new AuthenticationError("user not authenticated");
      //   }

      let born;
      if (args.born) {
        born = args.born;
      }

      const newAuthor = new Author({ name: args.name, born });

      try {
        return newAuthor.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args.name });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      //   if (!currentUser) {
      //     throw new AuthenticationError("user not authenticated");
      //   }

      try {
        return Author.findOneAndUpdate(
          { name: args.name },
          { born: args.born },
          { new: true }
        );
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        return user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user) {
        throw new UserInputError("user not found");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
