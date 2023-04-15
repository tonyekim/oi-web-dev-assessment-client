import React from "react";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";
import TablePagination from "./TablePagination";

function Dashboard() {
 

  return (
    <div className="px-3">
      <NavBar T />
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-75 bg-white rounded p-3">
          <NavLink to="/create" className="btn btn-success ml-3">
            Create Post +
          </NavLink>

          <div>
            <TablePagination />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
