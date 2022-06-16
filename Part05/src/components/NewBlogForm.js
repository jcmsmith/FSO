import { useState } from "react"
import PropTypes from "prop-types"

const NewBlogForm = ({ postNewBlog }) => {
  const blankBlog = { title: "", author: "", url: "" }

  const [newBlog, setNewBlog] = useState(blankBlog)

  const newBlogChange = (changedProperty, value) => {
    let title = newBlog.title
    let author = newBlog.author
    let url = newBlog.url

    if (changedProperty === "title") {
      title = value
    }

    if (changedProperty === "author") {
      author = value
    }

    if (changedProperty === "url") {
      url = value
    }

    setNewBlog({ title, author, url })
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      await postNewBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      })
      setNewBlog(blankBlog)

    } catch (err) {
      console.log("error", err)
    }
  }

  return (
    <>
      <h2>Post a new blog</h2>
      <form onSubmit={addBlog} className={"new-blog-form"}>
        <p>Title</p>
        <input
          value={newBlog.title}
          onChange={ ({ target }) => newBlogChange("title", target.value) }
          placeholder='Title'
          data-cy="newblog-titleinput"
        />
        <p>Author</p>
        <input
          value={newBlog.author}
          onChange={ ({ target }) => newBlogChange("author", target.value) }
          placeholder='Author'
          data-cy="newblog-authorinput"
        />
        <p>URL</p>
        <input
          value={newBlog.url}
          onChange={ ({ target }) => newBlogChange("url", target.value) }
          placeholder="URL"
          data-cy="newblog-urlinput"
        />
        <br />
        <button
          type="submit"
          id='save-blog-button'
          data-cy="newblog-save-button"
        >save</button>
      </form>
    </>
  )
}

NewBlogForm.propTypes = {
  postNewBlog: PropTypes.func.isRequired
}

export default NewBlogForm