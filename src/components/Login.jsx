import { useState } from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'
const Login = ({ logIn, notification }) => {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username,
      password
    }
    setUsername('')
    setPassword('')
    logIn(credentials)

  }

  return (
    <div>

      <h2>log in to application</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" name="Username" value={username} onChange={({ target }) => {setUsername(target.value)}}/>
        </div>
        <div>
          password
          <input type="password" name="Password" value={password} onChange={({ target }) => {setPassword(target.value)}}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  logIn : PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired

}


export default Login