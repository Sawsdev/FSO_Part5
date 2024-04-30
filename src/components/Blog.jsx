import { useState } from "react"
import BlogDetail from "./BlogDetail"
const Blog = ({ blog, updateBlog }) => {
  
  const [detailsVisibilty, setDetailsVisibility] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const showWhenVisible = { display: detailsVisibilty ? '' : 'none'}
  /**
   * handlers
   */

  const handleButtonClick = (event) => {
    let visibilty = !detailsVisibilty
    visibilty 
      ? event.target.textContent= "Hide"
      : event.target.textContent= "View"
      setDetailsVisibility(visibilty)
    
  }

  const handleBlogLike = (event) => {
    const updatedBlog = {
      user:blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes+1
    }
    updateBlog(blog.id, updatedBlog)
  }


  return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button type="button" onClick={handleButtonClick}>View</button>
        <div style={showWhenVisible}>
          <BlogDetail 
            url={blog.url}
            likes={blog.likes}
            author={blog.author}
            handleLike={handleBlogLike}
            />
        </div>
      </div>  
    )
}
export default Blog