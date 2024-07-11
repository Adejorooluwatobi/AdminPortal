/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';

let backendService;

function NewProduct() {
  const [productName, setProductName] = useState('');
  const [productContent, setProductContent] = useState('');
  const [value, setValue] = useState('');
  const [productLeft, setProductLeft] = useState('');
  const [images, setImages] = useState([]);
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

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('productContent', productContent);
      formData.append('value', value);
      formData.append('productLeft', productLeft);
      Array.from(images).forEach(image => formData.append('images', image));

      await axios.post(`${backendService}/product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          alert("New Product added successfully");
          navigate("/product");
        })
        .catch(err => {
          alert("Error");
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
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
                        <h1 className="px-0">Add New Product</h1>
                      </div>
                      <div className="mb-5">
                        <button type="submit" className="btn btn-primary">Save</button>
                      </div>
                    </ul>
                    <Form.Group className="mb-3" controlId="productName">
                      <Form.Control type="text" required placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="productContent">
                      <Form.Control as="textarea" rows={5} required placeholder="Product Content" value={productContent} onChange={(e) => setProductContent(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="value">
                      <Form.Control type="text" required placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="productLeft">
                      <Form.Control type="number" required placeholder="Product Left" value={productLeft} onChange={(e) => setProductLeft(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="images">
                      <Form.Control type="file" multiple onChange={handleImageChange} />
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

export default NewProduct;
