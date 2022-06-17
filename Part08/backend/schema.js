const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String!
    published: Int
    author: Author!
    genres: [String]
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(name: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    currentUser: User
    booksByGenre(genre: String!): [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String!]!
    ): Book!

    addAuthor(name: String!, born: Int): Author!
    editAuthor(name: String!, born: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
