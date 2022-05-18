import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  //console.log("login result", result);
  //console.log("login result.data", result.data);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("books-user-token", token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username } });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
