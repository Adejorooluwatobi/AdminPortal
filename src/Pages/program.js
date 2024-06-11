import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';

let backendService;

const Program = () => {
  const [programs, setPrograms] = useState([]);


  useEffect(() => {
    const fetchPrograms = async () => {
      try {

        let env = process.env.NODE_ENV;
        if (env === 'development') {
          backendService = process.env.REACT_APP_Backend_Url_Dev;
        }
        else {
          backendService = process.env.REACT_APP_Backend_Url_Prod;
        }

        const response = await axios.get(`${backendService}/program`);
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this program?");
    if (confirmed) {
      try {
        const env = process.env.NODE_ENV;
        const backendService = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;

        const response = await axios.delete(`${backendService}/program/${id}`);
        alert(response.data.message);
        setPrograms(programs.filter(program => program._id !== id));
      } catch (error) {
        console.error("Error deleting program:", error);
        alert("Error deleting program");
      }
    }
  };

  return (
    <Fragment>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
        <Sidebar />
        <div className="body-wrapper">
          <Header />
          <div className="container-fluid">
            <div className="navbar-collapse justify-content-end px-0 mb-9" id="navbarNav">
              <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                <Link to="/newProgram" className="btn btn-primary">New Program</Link>
              </ul>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4 mt-9">PROGRAMS</h5>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {programs.map(program => (
                        <tr key={program._id}>
                          <td>{program.title}</td>
                          <td>{program.content}</td>
                          <td>{program.IsActive ? "Active" : "Inactive"}</td>
                          <td>
                            <Link to={`/editprogram/${program._id}`} className="btn btn-primary">Edit</Link>
                            <button onClick={() => handleDelete(program._id)} className="btn btn-danger ms-2">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Program;
