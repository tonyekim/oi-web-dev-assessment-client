import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import validation from './SignupValidation';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState({});
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = validation(values); setError(err);         
    if(err.name === "" && err.email === "" && err.password === "") {
      axios.post('http://localhost:8081/signup', values)
      .then(res => {
        navigate('/')
      })
      .catch(err => console.log(err))
      
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    console.log('Before:', values); // Debugging statement
    setValues({ ...values, [name]: value });
    console.log('After:', values); // Debugging statement
  };

  console.log('Error:', error); // Debugging statement

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100 ">
      <div className="bg-white p-3 rounded w-25">
        <div className="d-flex justify-content-center align-items-center">
          <h1>Sign Up</h1>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={handleInput}
              name="name"
              className="form-control rounded-0"
            />
            <span>
              {error.name && (
                <span className="text-danger">{error.name}</span>
              )}
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={handleInput}
              name="email"
              className="form-control rounded-0"
            />
            <span>
              {error.email && (
                <span className="text-danger">{error.email}</span>
              )}
            </span>
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
          <button className="btn btn-success w-100 rounded-0">
            <strong>Sign Up</strong>
          </button>
          <p>You are to agree to our terms and conditions</p>
          <NavLink
            to="/"
            className="btn btn-default border w-100 rounded-0"
          >
            Login
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Signup;
