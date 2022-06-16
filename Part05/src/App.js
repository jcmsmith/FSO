import { useState, useEffect, useRef } from "react"

import login from "./services/login"
import { create, del, getAll, setToken, update } from "./services/blogs"

import Blog from "./components/Blog"
import NewBlogForm from "./components/NewBlogForm"
import LoginForm from "./components/LoginForm"
import Message from "./components/Message"
import VisibilityToggle from "./components/VisibilityToggle"

const App = () => {
  const [allBlogs, setAllBlogs] = useState([])
  const [blogsToDisplay, setBlogsToDisplay] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [message, setMessage] = useState(null)
  const [messageIsError, setMessageIsError] = useState(false)

  const visibilityToggleRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("Attempting to log in as", usernameInput)

    try {
      const user = await login({
        username: usernameInput,
        password: passwordInput
      })

      window.localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      )

      setToken(user.token)
      console.log("logged in as ", usernameInput)

      setCurrentUser(user)
      setUsernameInput("")
      setPasswordInput("")
    } catch (exception) {
      console.log(exception)
      displayMessage("Invalid username or password!", true)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    displayMessage(`See you later, ${currentUser.name}!`)
    setToken(null)
    window.localStorage.removeItem("loggedInUser")
    setCurrentUser(null)
  }

  const usernameInputChange = (username) => {
    setUsernameInput(username)
  }

  const pwInputChange = (password) => {
    setPasswordInput(password)
  }

  const postNewBlog = async (newBlog) => {
    console.log("newBlog", newBlog)

    if (newBlog.title.length <= 3) {
      displayMessage("Title is too short!", true)
      throw new Error("Title is too short!")
    }

    const blogMatch = allBlogs.filter(blog => {
      return blog.title.toLowerCase() === newBlog.title.toLowerCase()
    })

    if (blogMatch && blogMatch.length > 0) {
      console.log("blog match", blogMatch)
      displayMessage("Existing blog found, please change title", true)
      throw new Error("Existing blog!")
    }

    const response = await create(newBlog)
    const likes = response.likes === undefined ? 0 : response.likes
    const postedBlog = {
      ...newBlog,
      likes:likes,
      id: response.id,
      user: {
        username: currentUser.username,
        name: currentUser.name,
        id: response.user
      } }

    visibilityToggleRef.current.toggleVisibility()

    console.log(`Posting new blog: ${newBlog.title}, ${newBlog.author}, ${newBlog.url}`)
    displayMessage(`Posting new blog: ${newBlog.title}, ${newBlog.author}, ${newBlog.url}`)

    setAllBlogs(allBlogs.concat(postedBlog))
  }

  const updateBlog = async (newBlog) => {
    console.log("updating blog", newBlog)

    const response = await update(newBlog.id, { ...newBlog, user: newBlog.user.id })

    const newBlogs = allBlogs.map(blog => {
      if (blog.id === newBlog.id) {
        return { ...newBlog, id: response.id }
      }
      return blog
    })

    setAllBlogs(newBlogs)
  }

  const deleteBlog = async (id) => {
    await del(id)

    const blogs = allBlogs.filter(blog => blog.id !== id)
    setAllBlogs(blogs)
  }

  const displayMessage = (text, isError, time) => {
    const displayTime = time || 5000

    setMessageIsError(isError || false)
    setMessage(text.toString())
    setTimeout(() => {
      setMessage(null)
      setMessageIsError(false)
    }, displayTime)
  }

  const showLoginForm = () => {
    return (
      <LoginForm
        handleLogin={handleLogin}
        handleUsernameInput={usernameInputChange}
        handlePwInput={pwInputChange}
        username={usernameInput}
        pw={passwordInput}
      />
    )
  }

  const showBlogs = () => {
    console.log("blogs", allBlogs)
    return (
      <div>
        <p data-cy="loggedin-as-msg">Logged in as: {currentUser.name}</p>
        <button onClick={handleLogout}>Logout</button>

        <VisibilityToggle
          buttonLabel="new blog"
          ref={visibilityToggleRef}
          data-cy="toggle-newblogform"
        >

          <NewBlogForm
            postNewBlog={postNewBlog}
            data-cy="new-blog-form"
          />

        </VisibilityToggle>

        <h1>Blog List</h1>

        {allBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={(blog) => updateBlog(blog)}
            deleteBlog={(id) => deleteBlog(id)}
            deleteAllowed={currentUser.id === blog.user.id}
            data-cy="blog"
          />
        )}

      </div>
    )
  }

  //checkIfLoggedInHook
  useEffect(() => {
    const checkIfLoggedInHook = () => {
      const loggedInUserJSON = window.localStorage.getItem("loggedInUser")
      if (loggedInUserJSON) {
        const user = JSON.parse(loggedInUserJSON)
        setCurrentUser(user)
        setToken(user.token)
      } else {
        setCurrentUser(null)
      }
    }
    checkIfLoggedInHook()

  }, [])

  //getAllBlogsHook
  useEffect(() => {
    const getAllBlogsHook = async () => {
      const newBlogs = await getAll()

      const blogs = newBlogs.filter(blog => blog.user !== null)

      setAllBlogs(blogs)
    }
    getAllBlogsHook()
  }, [])

  useEffect(() => {
    const blogs = allBlogs.sort((blog1, blog2) => {
      if (blog1.likes === blog2.likes) {
        return 0
      }

      return (blog1.likes > blog2.likes) ? -1 : 1
    })

    setBlogsToDisplay(blogs)
  }, [allBlogs])

  return (
    <>
      <div data-cy="display-message">
        <Message msg={message} isError={messageIsError}/>
      </div>

      {currentUser === null
        ? showLoginForm()
        : showBlogs()
      }
    </>
  )
}

export default App
