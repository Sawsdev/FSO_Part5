import { useState } from "react"
import BlogDetail from "./BlogDetail"
const Blog = ({ blog }) => {
  
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


  return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button type="button" onClick={handleButtonClick}>View</button>
        <div style={showWhenVisible}>
          <BlogDetail 
            url={blog.url}
            likes={blog.likes}
            author={blog.author}
            />
        </div>
      </div>  
    )
}
export default Blog