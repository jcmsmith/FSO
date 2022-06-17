import { gql } from "@apollo/client";

export const updateCache = (cache, query, addedBook) => {
  const uniqueNames = (list) => {
    let checked = new Set();
    return list.filter((book) => {
      let title = book.title;
      return checked.has(title) ? false : checked.add(title);
    });
  };
  //               allBooks is deconstructed from the cache
  cache.updateQuery(query, (cacheData) => {
    if (!cacheData) {
      return;
    }

    return {
      allBooks: uniqueNames(cacheData.allBooks.concat(addedBook)),
    };
  });
};

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
      born
      bookCount
      id
    }
    genres
    id
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const CURRENT_USER = gql`
  query {
    currentUser {
      username
      favoriteGenre
      id
    }
  }
`;

export const FILTERED_BOOKS = gql`
  query filteredBooks($genre: String!) {
    booksByGenre(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const SET_BIRTHYEAR = gql`
  mutation setBirthyear($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!) {
    login(username: $username) {
      value
    }
  }
`;
