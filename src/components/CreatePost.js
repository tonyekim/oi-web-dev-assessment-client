import axios from "axios";

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault();
    axios.post("http://localhost:8081/create", { name, content, category })
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Post</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Content</label>
            <textarea
              type="text"
              placeholder="Enter Content"
              className="form-control"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Category</label>
            <textarea
              type="text"
              placeholder="Enter Category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">Create Post</button>
        </form>
      </div>
    </div>
  );
}
export default CreateStudent;
