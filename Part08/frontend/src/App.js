import { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import { ALL_BOOKS, BOOK_ADDED, updateCache } from "./queries/queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("recs");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} added!`);

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
      console.log("updated cache after subscription", client.cache);
    },
  });

  useEffect(() => {
    const tokenExists = localStorage.getItem("books-user-token");
    if (tokenExists) {
      setToken(tokenExists);
    }
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    if (window.confirm("Are you sure you wish to logout?")) {
      setToken(null);
      localStorage.clear();
      client.resetStore();
    }
  };

  if (!token) {
    return (
      <div>
        <Notification errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Notification errorMessage={errorMessage} />
        <button onClick={logout}>logout</button>
        <button onClick={() => setPage("recs")}>recommendations</button>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      {page === "recs" ? <Recommendations setError={notify} /> : null}
      {page === "authors" ? <Authors setError={notify} /> : null}
      {page === "books" ? <Books setError={notify} /> : null}
      {page === "add" ? <NewBook setError={notify} /> : null}
    </div>
  );
};

export default App;
