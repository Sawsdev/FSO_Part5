import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Toggable from './components/Toggable'
import Login from './components/Login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ user, setUser ] = useState(null)
  const [ notification, setNotification ] = useState({
    message: null,
    type: null
  }) 
  

  const blogFormRef = useRef()
  const getBlogs = () => {
    blogService.getAll().then(blogs =>{
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )
    }
    )
  }


  useEffect(getBlogs, [])

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if(loggedInUser)
    {
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
    
  }, [])

  /**
   * Handlers
   */
  const handleLogin = async ({username, password}) => {

    try {
      const user = await loginService.login({
        username, password
      })
  
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      
    } catch (error) {
      setNotification({
        message: `${error.response.data.error}`,
        type: "error"
      })
      setTimeout(() => {
        setNotification({
          message: null,
          type: null
        })
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  /**
   * Core functionality
   */

  const addBlog = async (newBlog) => {
    
    try {
      
      const createdBlog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()

      if (createdBlog) {
        setBlogs(blogs.concat(createdBlog))
        setNotification({
          message: `a new blog '${createdBlog.title}' by ${createdBlog.author} added!`,
          type:'info'
        })
        setTimeout(() => {
          setNotification({
            message:null,
            type: null
          })
        },4000)

      }
    } catch (error) {
      setNotification({
        message: `${error.response.data.error}`,
        type:'error'
      })
    }
  }

  const updateBlog = async (id, blog) => {
    try {
      const updatedBlog = await blogService.update(id, blog)
      setBlogs(blogs.map(b => b.id !== id ? b: updatedBlog) )
      getBlogs()
    } catch (error) {
      
    }
  }

  const removeBlog = async (blog) => {
    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirmed) {
      try {
        const removedBlog = blogs.find((b) => b.id === blog.id)
        await blogService.remove(blog.id)
        getBlogs()
        setNotification({
          message: `'${removedBlog.title}' by ${removedBlog.author} removed!`,
          type:'info'
        })
        setTimeout(() => {
          setNotification({
            message:null,
            type: null
          })
        },4000)
      } catch (error) {
        setNotification({
          message: `${error.response.data.error}`,
          type:'error'
        })
        setTimeout(() => {
          setNotification({
            message:null,
            type: null
          })
        },4000)
      }
    }
  }

  /**
   * Rendering functions
   */


  const blogListArea = () => (
    <div>
        <p>{user.name} logged in
         <button type="button" onClick={handleLogout}>logout</button></p>
         <br />
         <Notification message={notification.message} type={notification.type} />

         <br />
         {
          <Toggable buttonLabel="create blog" ref={blogFormRef}>
            <CreateBlogForm addBlog={addBlog} /> 
          </Toggable>
          }
         <br />
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} 
                blog={blog} 
                updateBlog={updateBlog}
                removeBlog={removeBlog}
          />
        )}
    </div>
  )

  return (
    <div>
      {user === null 
        ? <Login logIn={handleLogin} notification={notification} />
        : blogListArea()
      }
      
    </div>
  )
}

export default App