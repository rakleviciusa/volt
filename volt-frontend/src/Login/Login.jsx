import React, { useContext } from 'react'
import { useState } from 'react'
import AuthContext from '../context/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const {login} = useContext(AuthContext)

  const sendLoginRequest = async (e) => {
    let payload = {
      username: username,
      password: password
    }
    await login(payload)
  }

  return (
    <div>
        <h2>Log In</h2>
        <div className='form'>
            <div>
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id='username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                  type="text" 
                  id='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}/>
            </div>
            <button 
              type='submit' 
              onClick={sendLoginRequest}>
                Log in
            </button>
        </div>
    </div>
  )
}

export default Login