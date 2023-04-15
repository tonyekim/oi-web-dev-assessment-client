import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePost() {
    
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate()
    const {id} = useParams()
  
    function handleSubmit(event) {
      event.preventDefault();
      axios.put("http://localhost:8081/update/"+id, { name, content, category, id })
        .then((res) => {
          console.log(res);
          navigate("/home");
        })
        .catch((err) => console.log(err));
    }
    
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      
      <div className="w-50 bg-white rounded p-3">
        
        <form  onSubmit={handleSubmit} >
          
          <h2>Update Post</h2>
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
            <input
              type="text"
              placeholder="Enter "
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update Post</button>
        </form>
      </div>
    </div>
  );
}
export default UpdatePost;
