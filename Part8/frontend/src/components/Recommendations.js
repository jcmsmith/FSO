import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { CURRENT_USER, ALL_BOOKS } from "../queries/queries";

const Recommendations = ({ setError }) => {
  const [recs, setRecs] = useState([]);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  const booksQuery = useQuery(ALL_BOOKS, {
    onError: (error) => {
      if (typeof error.graphQLErrors[0] !== "undefined") {
        setError(error.graphQLErrors[0].message);
      } else {
        setError(error.message);
      }
    },
    onCompleted: (data) => setBooks(data.allBooks),
  });

  const userQuery = useQuery(CURRENT_USER, {
    onError: (error) => {
      if (typeof error.graphQLErrors[0] !== "undefined") {
        setError(error.graphQLErrors[0].message);
      } else {
        setError(error.message);
      }
    },
    onCompleted: (data) => setUser(data.currentUser),
  });

  //get recs
  useEffect(() => {
    if (!user || !books) {
      return;
    }

    const userFavorite = user.favoriteGenre.toLowerCase();

    let recommendations = [];
    books.forEach((book) => {
      book.genres.forEach((genre) => {
        const isFavorite = userFavorite === genre.toLowerCase();

        if (isFavorite && !recommendations.includes(book)) {
          recommendations.push(book);
        }
      });
    });

    setRecs(recommendations);
  }, [books, user]);

  if (userQuery.loading || booksQuery.loading) {
    return <h2>loading...</h2>;
  }

  return user === null ? null : (
    <div>
      <h3>Hello, {user.username}! Here are your recommended books:</h3>
      {recs.length === 0 ? (
        <div>No recommendations found! Your favorite genre probably sucks</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>book</th>
              <th>author</th>
            </tr>
          </thead>
          <tbody>
            {recs.map((rec) => {
              return (
                <tr key={rec.title}>
                  <td>{rec.title}</td>
                  <td>{rec.author.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Recommendations;
