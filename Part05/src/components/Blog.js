import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, likeBlog, deleteBlog, deleteAllowed }) => {
  const [showDetails, setShowDetails] = useState(false)
  //  const [showDeleteButton, setShowDeleteButton] = useState(deleteAllowed)

  const hiddenWhenExpanded = { display: showDetails ? "none" : "" }
  const shownWhenExpanded = { display: showDetails ? "" : "none" }
  const showDeleteButton = { display: deleteAllowed ? "" : "none" }

  const minimalStyle = {
    width:  300,
    paddingTop: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    paddingBottom: 5,
    display: hiddenWhenExpanded.display
  }

  const expandedStyle = {
    width:  300,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    paddingBottom: 10,
    display: shownWhenExpanded.display
  }

  const toggleDetails = (event) => {
    event.preventDefault()

    setShowDetails(!showDetails)
  }

  const handleLikeButton = (event) => {
    event.preventDefault()
    console.log(`likes ${blog.likes} -> ${blog.likes+1}`)
    likeBlog({ ...blog, likes: blog.likes+1 })
  }

  const handleDeleteButton = (event) => {
    event.preventDefault()

    if (window.confirm("Are you sure you wish to delete this blog?")) {
      deleteBlog(blog.id)
    }
  }

  return (
    <>
      <div style={minimalStyle} className='minimal' data-cy="blog-minimal">

        <div className='blogTitle' data-cy="blog-title-minimal">
          {blog.title + "      "}
        </div>

        <button
          onClick={toggleDetails}
          id='show-details'
          data-cy="blog-showdetails-button"
        >show details</button>

        <div style={showDeleteButton}>
          <button
            onClick={handleDeleteButton}
            data-cy="blog-delete-button-minimal"
          >delete</button>
        </div>

      </div>

      <div style={expandedStyle} className='expanded' data-cy="blog-expanded">

        <div className='blogTitle' data-cy="blog-title-expanded">
          <p><strong>&quot;{blog.title}&quot;</strong></p>
        </div>

        <div className='blogDetails'>

          <p>by: {blog.author}</p>
          <p data-cy="blog-likes-label">
            likes: {blog.likes + "      "}
            <button
              onClick={handleLikeButton}
              id='like-button'
              data-cy="blog-like-button"
            >Like</button>
          </p>
          <p>URL: {blog.url}</p>

        </div>

        <button onClick={toggleDetails} id='hide-details'>hide details</button>

        <div style={showDeleteButton}>
          <button
            onClick={handleDeleteButton}
            data-cy="blog-delete-button-expanded"
          >delete</button>
        </div>

      </div>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // likeBlog: PropTypes.func.isRequired,
  // deleteBlog: PropTypes.func.isRequired,
  // deleteAllowed: PropTypes.bool.isRequired
}

export default Blog