import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { purple } from "@mui/material/colors";
import { createTheme } from "@mui/material";

import { checkIfLoggedIn, fetchAllUsers } from "./reducers/usersReducer";
import { fetchAllBlogs } from "./reducers/blogsReducer";

import Header from "./components/Header";
import BlogList from "./components/BlogList";
import BlogInfo from "./components/BlogInfo";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import UserInfo from "./components/UserInfo";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIfLoggedIn());
    dispatch(fetchAllUsers());
    dispatch(fetchAllBlogs());
  }, []);

  const user = useSelector((state) => state.users[1].currentUser);

  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: "#f44336",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container>
          <Header />
          <Routes>
            {user.token === null ? (
              <Route path="/login" element={<LoginForm />} />
            ) : (
              <>
                <Route path="/" element={<Navigate replace to="/blogs" />} />
                <Route path="/blogs" element={<BlogList userId={user.id} />} />
                <Route path="/blogs/:id" element={<BlogInfo />} />
                <Route
                  path="/blogs/new"
                  element={<NewBlogForm user={user} />}
                />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:id" element={<UserInfo />} />
              </>
            )}
            <Route
              path="*"
              element={
                <>
                  <h3>There's nothing here!</h3>
                </>
              }
            />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
