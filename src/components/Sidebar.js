import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-white w-[200px] h-full p-2">
      <div className="m-2">
        <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
        <span className="brand-name fs-4 me-3">CMS APP</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <span className="list-group-item hover:bg-blue-700 hover:text-white">
          <i class="bi bi-speedometer2 fs-4 me-3"></i>
          <span className="fs-5">Dashboard</span>
        </span>
        <span className="list-group-item  hover:bg-blue-700 hover:text-white">
          <i className="bi bi-house fs-4 me-3"></i>
          <span className="fs-5">Home</span>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;