/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Sidebar from "./Sidebar";
import Header from "./Header";

let backendService;

const NewSlider = () => {
  const [sliderData, setSliderData] = useState({
    subTitle: '',
    title: '',
    content: '',
    image: '',
    image2: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchSliderData = async () => {
      let env = process.env.NODE_ENV;
      if (env === 'development') {
        backendService = process.env.REACT_APP_Backend_Url_Dev;
      } else {
        backendService = process.env.REACT_APP_Backend_Url_Prod;
      }
      try {
        const response = await axios.get(`${backendService}/slider`);
        if (response.data && response.data.slider) {
          setSliderData(response.data.slider);
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchSliderData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSliderData({ ...sliderData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSliderData({ ...sliderData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('subTitle', sliderData.subTitle);
    formData.append('title', sliderData.title);
    formData.append('content', sliderData.content);
    formData.append('image', sliderData.image);
    formData.append('image2', sliderData.image2);

    try {
      const response = await axios.put(`${backendService}/slider`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        alert('Slider updated successfully!');
        navigate("/slider"); // Navigate to "/slider" after successful update
      } else {
        alert(`Failed to update slider. Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating slider:', error);
      if (error.response) {
        alert(`Failed to update slider. Server responded with status ${error.response.status}`);
      } else if (error.request) {
        alert('Failed to update slider. Check your network connection.');
      } else {
        alert('An unexpected error occurred while updating slider.');
      }
    }
  };

  return (
    <Fragment>
      {/* Body Wrapper */}
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed">
        <Sidebar />
        {/* Main wrapper */}
        <div className="body-wrapper">
          <Header />
          {/* Header End */}
          <div className="container-fluid">
            <div className="card-body">
              <div className="card">
                <div className="card-body">
                  <div className="container">
                    <div>
                      <h2>Slider Information</h2>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group>
                          <Form.Label>Sub Title:</Form.Label>
                          <Form.Control
                            type="text"
                            name="subTitle"
                            value={sliderData.subTitle}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Title:</Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            value={sliderData.title}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Content:</Form.Label>
                          <Form.Control
                            type="text"
                            name="content"
                            value={sliderData.content}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Image:</Form.Label>
                          <Form.Control
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Image2:</Form.Label>
                          <Form.Control
                            type="file"
                            name="image2"
                            onChange={handleFileChange}
                            required
                          />
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary mt-3">
                          Update Slider
                        </Button>
                      </Form>
                    </div>
                  </div>
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
};

export default NewSlider;
