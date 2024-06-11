/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from './Header';
import Sidebar from './Sidebar';

let backendService;

const Slider = () => {
  const [sliderData, setSliderData] = useState({
    subTitle: '',
    title: '',
    content: '',
    image: '',
    image2: ''
  });

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        let env = process.env.NODE_ENV;
      if (env === 'development') {
        backendService = process.env.REACT_APP_Backend_Url_Dev;
      } else {
        backendService = process.env.REACT_APP_Backend_Url_Prod;
      }

        const response = await axios.get(`${backendService}/slider`);
        if (response.data && response.data.slider) {
          setSliderData(response.data.slider);
        }
      } catch (error) {
        console.error('Error fetching slider data:', error);
      }
    };

    fetchSliderData();
  }, []);

  const getImageUrl = (imageName) => {
    return `${backendService}${imageName}`; // Adjust the path as per your server setup
  };

  const imageUrl = getImageUrl(sliderData.image);
  const image2Url = getImageUrl(sliderData.image2);

  return (
    <Fragment>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed">
        <Sidebar />
        <div className="body-wrapper">
          <Header />
          <div className="container-fluid">
            <div className="navbar-collapse justify-content-end px-0 mb-9" id="navbarNav">
              <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                <Link to="/newSlider" className="btn btn-primary">Edit</Link>
              </ul>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4 mt-9">CONTACT INFORMATION</h5>
                <div className="text">
                  <p><strong>Sub title:</strong> {sliderData.subTitle}</p>
                  <p><strong>Title:</strong> {sliderData.title}</p>
                  <p><strong>Content:</strong> {sliderData.content}</p>
                  <br />
                  <h3>Banners:</h3>
                  <p><strong>Image:</strong> <img src={imageUrl} alt={sliderData.image || "Slider"} style={{ maxWidth: "100px" }} /></p>
                  <p><strong>Image2:</strong> <img src={image2Url} alt={sliderData.image2 || "Slider"} style={{ maxWidth: "100px" }} /></p>
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

export default Slider;
