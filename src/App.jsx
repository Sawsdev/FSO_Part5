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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
        },)

      }
    } catch (error) {
      setNotification({
        message: `${error.response.data.error}`,
        type:'error'
      })
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
          <Blog key={blog.id} blog={blog} />
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