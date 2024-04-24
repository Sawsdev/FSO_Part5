import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    loggedInUser
    ? setUser(loggedInUser)
    : console.log("no user");
  }, [])

  /**
   * Handlers
   */
  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({
      username, password
    })


    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    setUser(user)
    setUsername('')
    setPassword('')
  }


  /**
   * Rendering functions
   */

  const loginForm = () => (
    <div>

    <h2>log in to application</h2>
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
        <p>{user.name} logged in</p>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
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