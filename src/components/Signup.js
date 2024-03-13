import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const Navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name:"", email: "", password: "" });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Click")
    const response = await fetch(`https://task-manager-o6md.onrender.com/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:credentials.name,  email: credentials.email, password: credentials.password }),
      // body: JSON.stringify(data)
    }, []);
    console.log(response)

    const json = await response.json();
    console.log(json);
    if (json.success) {
      setCredentials(json);
      localStorage.setItem("token", json.authToken);
      Navigate("/");
    }
    else {
      alert("wrong credentials");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log(credentials.email, credentials.password);
  }

  return (
    <div className='container'>
      <h1>Signup To Your Account</h1>
      <form  onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" placeholder="Enter name" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}

export default Signup