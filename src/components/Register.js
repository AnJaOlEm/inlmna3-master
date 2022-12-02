import React, { useState } from 'react'

export default function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const data = {
    name: name,
    username: username,
    password: password
  }

  async function registerUser() {
    // Default options are marked with *
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    console.log(response.json())

    setPassword("");
    setUsername("");
    setName("");

    // return response.json(); // parses JSON response into native JavaScript objects
  }

  return (
    <div className='container-fluid'>
      <div className='border border-secondary rounded p-2'>
        <input placeholder='Username' className='m-1 rounded border-secondary' onChange={(e) => { setUsername(e.target.value) }} value={username} />
        <input placeholder='Password' className='m-1 rounded border-secondary' onChange={(e) => { setPassword(e.target.value) }} value={password} />
        <input placeholder='Name' className='m-1 rounded border-secondary' onChange={(e) => { setName(e.target.value) }} value={name} />

        <button className='btn btn-primary p-2 m-1' onClick={registerUser}>Register user</button>
      </div>
    </div>
  )
}

