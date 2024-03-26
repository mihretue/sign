import React, {useState} from 'react'
import axios from './api/axios'
import { Link } from 'react-router-dom'

export default function Login() {
  const [username,setUsername]= useState('')
  const [password,setPassword]= useState('')
  const [error,setError]= useState('')
  const [success,setSuccess]= useState(false)


  const handleInputChange= (e)=>{
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e)=>{
    setPassword(e.target.value)
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/login', {
        username,
        password,
      });
      
      console.log("Login successful:", response.data);
      setSuccess(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred during login");
        console.error("Login error:", error);
      }
    }
  };
  
  return (
    <div className='container'>
      {error && <div>{error}</div>}
      {
        success ? (<p>
          <Link to='/success' >Success</Link>
        </p>
      ):(
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
            type='text' 
            name='username'
            value={username}
            onChange={handleInputChange}
        />
        <label>password</label>
        <input 
            type='password' 
            name='password'
            value={password}
            onChange={handlePasswordChange}
        />
        <button type='submit'>Login</button>
      </form>)
    }</div>
  )
}
