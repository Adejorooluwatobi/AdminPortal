import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let backendService;

function Register(){

  const history = useNavigate();


  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function submit(e){
  e.preventDefault();


  try{
    let env = process.env.NODE_ENV;
    if (env === 'development') {
      backendService = process.env.REACT_APP_Backend_Url_Dev;
    }
    else {
      backendService = process.env.REACT_APP_Backend_Url_Prod;
    }
    

    await axios.post(`${backendService}/register`, {
        username, email, password
    })
    .then(res => {
      if(res.data === "Exist"){
        alert("Information already exist")
      }
      else if(username === "" || email === '' || password === ""){
        alert("Please fill all fields")
      }

      else{
        if(res.data === 'notexist'){
         history("/")
        }
      }
    })
    .catch(e => {
      alert("Registration Failed")
      console.log(e);
    })
  }
 catch (e){
  console.log(e)
 }

}


    return(
        <Fragment>
  {/* <!--  Body Wrapper --> */}
  <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div
      className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-3">
            <div className="card mb-0">
              <div className="card-body">
                <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                  <img src="../assets/images/logos/dark-logo.svg" width="180" alt=""/>
                </a>
                <p className="text-center">Your Legal Campaigns</p>
                <form action="POST" method="/register">
                  <div className="mb-3">
                    <label for="exampleInputtext1" className="form-label">Name</label>
                    <input type="text" onChange={(e) => { setUsername(e.target.value) }} className="form-control" id="exampleInputtext1" aria-describedby="textHelp" required/>
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email Address</label>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                  </div>
                  <div className="mb-4">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword1" required/>
                  </div>
                  <Link to="/index" type="submit" onClick={submit} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign Up</Link>
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                    <Link to="/" className="text-primary fw-bold ms-2" >Sign In</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        </Fragment>
    )
}

export default Register;