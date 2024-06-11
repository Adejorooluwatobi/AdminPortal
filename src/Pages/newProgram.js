
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';

let backendService;

function NewProgram() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      let env = process.env.NODE_ENV;
      if (env === 'development') {
        backendService = process.env.REACT_APP_Backend_Url_Dev;
      } else {
        backendService = process.env.REACT_APP_Backend_Url_Prod;
      }
      await axios.post(`${backendService}/program`, {
        content,
        title,
      })
        .then(() => {
          alert("New Program added successfully");
          navigate("/program");
        })
        .catch(err => {
          alert("Error");
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Fragment>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
        <Sidebar />
        <div className="body-wrapper">
          <Header />
          <div className="container-fluid">
            <div className="card-body">
              <div className="card">
                <div className="card-body">
                  <Form onSubmit={submit}>
                    <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-between">
                      <div>
                        <h1 className="px-0">Add New Program</h1>
                      </div>
                      <div className="mb-5">
                        <button type="submit" className="btn btn-primary">Save</button>
                      </div>
                    </ul>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" required placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Control as="textarea" rows={5} required placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="../assets/libs/jquery/dist/jquery.min.js"></script>
      <script src="../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
      <script src="../assets/js/sidebarmenu.js"></script>
      <script src="../assets/js/app.min.js"></script>
      <script src="../assets/libs/simplebar/dist/simplebar.js"></script>
    </Fragment>
  );
}

export default NewProgram;