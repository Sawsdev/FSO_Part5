import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ notification, setNotification ] = useState({
    message: null,
    type: null
  }) 
  



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
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
  
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      
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
  const addBlog = async (event) => {
    event.preventDefault()
    console.log('create blog with', title, author, url);
    const newBlog = {
      title,
      author, 
      url
    }
    try {
      
      const createdBlog = await blogService.create(newBlog)
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
        setTitle('')
        setAuthor('')
        setUrl('')
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

  const loginForm = () => (
    <div>

    <h2>log in to application</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" name="Username" value={username} onChange={({target}) => {setUsername(target.value)}}/>
        </div>
        <div>
          password
          <input type="password" name="Password" value={password} onChange={({target}) => {setPassword(target.value)}}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  const blogListArea = () => (
    <div>
        <p>{user.name} logged in
         <button type="button" onClick={handleLogout}>logout</button></p>
         <br />
         <Notification message={notification.message} type={notification.type} />

         <br />
         {formCreateNewBlog()}
         <br />
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )

  const formCreateNewBlog = () => (
    <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input type="text" name="Title" value={title} onChange={({target}) => {setTitle(target.value)}}/>
          </div>
          <div>
            author:
            <input type="text" name="Author" value={author} onChange={({target}) => {setAuthor(target.value)}} />          
          </div>
          <div>
            url:
            <input type="url" name="Url" value={url} onChange={({target}) => {setUrl(target.value)}} />          
          </div>
          <button type='submit'>create</button>
        </form>
    </div>
)

  return (
    <div>
      {user === null 
        ? loginForm()
        : blogListArea()
      }
      
    </div>
  )
}

export default App