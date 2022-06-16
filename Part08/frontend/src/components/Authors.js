import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import Select from "react-select";

import { ALL_AUTHORS, SET_BIRTHYEAR } from "../queries/queries";

const Authors = ({ setError }) => {
  const [authorBorn, setAuthorBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const authorQuery = useQuery(ALL_AUTHORS);

  const [changeBirthyear, result] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("author not found");
    }
  }, [result.data]);

  if (authorQuery.loading) {
    return <div>loading...</div>;
  }

  const handleSetBirthyear = (event) => {
    event.preventDefault();

    const born = parseInt(authorBorn);

    changeBirthyear({ variables: { name: selectedOption, born } });

    setAuthorBorn("");
  };

  const authors = authorQuery.data.allAuthors;
  console.log("authors", authors);

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((author) => (
              <tr key={author.name}>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleSetBirthyear}>
          <Select
            options={authors}
            getOptionLabel={(author) => author.name}
            getOptionValue={(author) => author.name}
            onChange={(selected) => setSelectedOption(selected.name)}
          />
          born
          <input
            value={authorBorn}
            type="number"
            onChange={({ target }) => setAuthorBorn(target.value)}
          />
          <br />
          <button type="submit">update</button>
        </form>
      </div>
    </>
  );
};

export default Authors;
