import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import validation from "./LoginValidation";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const [error, setError] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = validation(values); setError(err);         
    if( err.email === "" && err.password === "") {
      axios.post('http://localhost:8081/login', values)
      .then(res => {
        if (res.data === "Success") {
          navigate('/home')
        } else {
          alert("No record in database!!")
        }
      })
      .catch(err => console.log(err))
      
    }
  };

  const handleInput = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100 ">
      <div className="bg-white p-3 rounded w-25">
        <div className="d-flex justify-content-center align-items-center">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {error.email && <span className="text-danger">{error.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={handleInput}
              name="password"
              className="form-control rounded-0"
            />

<span>
              {error.password && (
                <span className="text-danger">{error.password}</span>
              )}
            </span>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            <strong>Login</strong>
          </button>
          <p>You are to agree to our terms and conditions</p>
          <NavLink
            to="/signup"
            className="btn btn-default border w-100 rounded-0"
          >
            Create Account
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
