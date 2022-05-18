import { useState } from "react";
import { useMutation } from "@apollo/client";

import {
  CREATE_BOOK,
  ALL_BOOKS,
  ALL_AUTHORS,
  updateCache,
} from "../queries/queries";

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook, { data, loading, error }] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      if (typeof error.graphQLErrors[0] !== "undefined") {
        setError(error.graphQLErrors[0].message);
      } else {
        console.log("error", error);
        setError(error.message);
      }
    },
    update: (cache, response) => {
      const responseData = response.data.addBook;
      console.log("createBook mutation - response data", responseData);

      updateCache(cache, { query: ALL_BOOKS }, responseData);

      cache.updateQuery({ query: ALL_AUTHORS }, (cacheData) => {
        console.log("ALL_AUTHORS cache data", cacheData);
        if (!cacheData) {
          return;
        }

        //Check if author is already in cache and update if so
        let updated = false;
        const updatedAuthor = cacheData.allAuthors.map((author) => {
          if (author.name === responseData.author.name) {
            updated = true;
            return {
              __typename: responseData.author.__typename,
              name: responseData.author.name,
              born: responseData.author.born,
              bookCount: responseData.author.bookCount + 1,
              id: responseData.author.id,
            };
          }
        });

        //Add new author if author was not found to already be in cache
        if (!updated) {
          const addedAuthor = cacheData.allAuthors.concat(responseData.author);
          return { allAuthors: addedAuthor };
        }

        //Author was not added, returning updated author
        return { allAuthors: updatedAuthor };
      });
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    const date = published ? parseInt(published) : null;

    createBook({ variables: { title, published: date, author, genres } });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
