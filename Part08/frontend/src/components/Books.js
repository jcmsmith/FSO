import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { ALL_BOOKS, FILTERED_BOOKS } from "../queries/queries";

const Books = ({ setError }) => {
  const [filter, setFilter] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [booksToShow, setBooksToShow] = useState([]);

  const booksQuery = useQuery(ALL_BOOKS, {
    onError: (error) => {
      if (typeof error.graphQLErrors[0] !== "undefined") {
        setError(error.graphQLErrors[0].message);
      } else {
        setError(error.message);
      }
    },
    onCompleted: (data) => {
      const booksResponse = data.allBooks;

      //de-capitalize every book's genres, and map all unique genres
      let genres = [];
      const books = booksResponse.map((book) => {
        let convertedGenres = [];
        book.genres.forEach((genre) => {
          const lowercase = genre.toLowerCase();
          if (!genres.includes(lowercase)) {
            genres.push(lowercase);
          }
          convertedGenres.push(lowercase);
        });

        const convertedBook = { ...book, genres: convertedGenres };
        return convertedBook;
      });

      setAllGenres(genres);
      setAllBooks(books);
      setBooksToShow(books);
    },
  });

  const [filteredBooksQuery] = useLazyQuery(FILTERED_BOOKS, {
    onError: (error) => {
      if (typeof error.graphQLErrors[0] !== "undefined") {
        setError(error.graphQLErrors[0].message);
      } else {
        setError(error.message);
      }
    },
  });

  useEffect(() => {
    if (!filter) {
      if (allBooks) {
        setBooksToShow(allBooks);
        return;
      }
      return;
    }

    filteredBooksQuery({ variables: { genre: filter } }).then((response) => {
      setBooksToShow(response.data.booksByGenre);
    });
  }, [filter]);

  if (booksQuery.loading) {
    return <div>loading...</div>;
  }

  if (allBooks) {
    console.log("allBooks", allBooks);
    console.log("booksToShow", booksToShow);
  }

  return (
    <div>
      <h1>Books</h1>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Filter by genre</h2>
        <button onClick={() => setFilter("")}>All</button>
        {allGenres.map((genre) => {
          return (
            <button key={genre} value={genre} onClick={() => setFilter(genre)}>
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Books;
