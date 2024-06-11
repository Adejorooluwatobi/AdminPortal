import React, { Fragment, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

let backendService;

function Login() {

  const history = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e){
    e.preventDefault();

    try {
      let env = process.env.NODE_ENV;
      if (env === 'development') {
        backendService = process.env.REACT_APP_Backend_Url_Dev;
      }
      else {
        backendService = process.env.REACT_APP_Backend_Url_Prod;
      }

      await axios.post(`${backendService}/login`,{
        username,password
      })
      .then(res =>{
        
        if(username === '' || password === ''){
          alert("Please fill all fields")
        }
        else if(res.data === 'notexist'){
          alert('User does not exist')
        }
        else{
          if(res.data === 'exist'){
            history("/index", 
            window.location.href = "/index")
          }
        }
      })
      .catch(e => {
        alert('Credentials do not match')
      })
    }
    catch(e){
      console.log(e)
    }

  }

  return (
    <Fragment>
      <body>
        {/* <!--  Body Wrapper --> */}
        <div
          className="page-wrapper"
          id="main-wrapper"
          data-layout="vertical"
          data-navbarbg="skin6"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed"
        >
          <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center w-100">
              <div className="row justify-content-center w-100">
                <div className="col-md-8 col-lg-6 col-xxl-3">
                  <div className="card mb-0">
                    <div className="card-body">
                      <a
                        href="./index.html"
                        className="text-nowrap logo-img text-center d-block py-3 w-100"
                      >
                        <img
                          src="../assets/images/logos/dark-logo.svg"
                          width="180"
                          alt=""
                        />
                      </a>
                      <p className="text-center">Your Social Campaigns</p>
                      <form>
                        <div className="mb-3">
                          <label
                            for="exampleInputEmail1"
                            className="form-label"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            onChange={(e) => {
                              setUsername(e.target.value);
                            }}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            for="exampleInputPassword1"
                            className="form-label"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            className="form-control"
                            id="exampleInputPassword1"
                          />
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                          <div className="form-check">
                            <input
                              className="form-check-input primary"
                              type="checkbox"
                              value=""
                              id="flexCheckChecked"
                              checked
                            />
                            <label
                              className="form-check-label text-dark"
                              for="flexCheckChecked"
                            >
                              Remeber this Device
                            </label>
                          </div>
                          <a
                            className="text-primary fw-bold"
                            href="./index.html"
                          >
                            Forgot Password ?
                          </a>
                        </div>
                        <Link
                          to="/index"
                          type="submit" onClick={submit}
                          className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                        >
                          Sign In
                        </Link>
                        <div className="d-flex align-items-center justify-content-center">
                          <p className="fs-4 mb-0 fw-bold">
                            New to Legal firm??
                          </p>
                          <Link
                            to="/register"
                            className="text-primary fw-bold ms-2"
                          >
                            Create an account
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="../assets/libs/jquery/dist/jquery.min.js"></script>
        <script src="../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </Fragment>
  );
}

export default Login;