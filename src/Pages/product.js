import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';

let backendService;

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let env = process.env.NODE_ENV;
        if (env === 'development') {
          backendService = process.env.REACT_APP_Backend_Url_Dev;
        } else {
          backendService = process.env.REACT_APP_Backend_Url_Prod;
        }

        const response = await axios.get(`${backendService}/product`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        const env = process.env.NODE_ENV;
        const backendService = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;

        const response = await axios.delete(`${backendService}/product/${id}`);
        alert(response.data.message);
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product");
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
                <Link to="/newProduct" className="btn btn-primary">New Product</Link>
              </ul>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4 mt-9">PRODUCTS</h5>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Product Content</th>
                        <th>Value</th>
                        <th>Product Left</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product._id}>
                          <td>
                            {product.images && product.images.length > 0 && (
                              <img src={`${backendService}/${product.images[0]}`} alt={product.productName} style={{ width: '50px', height: '50px' }} />
                            )}
                          </td>
                          <td>{product.productName}</td>
                          <td>{product.productContent}</td>
                          <td>{product.value}</td>
                          <td>{product.productLeft}</td>
                          <td>{product.isActive ? "Active" : "Inactive"}</td>
                          <td>
                            <Link to={`/editProduct/${product._id}`} className="btn btn-primary">Edit</Link>
                            <button onClick={() => handleDelete(product._id)} className="btn btn-danger ms-2">Delete</button>
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

export default Product;
