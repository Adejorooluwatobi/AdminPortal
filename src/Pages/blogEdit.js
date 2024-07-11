import React, { Fragment, useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";

const BlogEdit = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState({
        title: '',
        content: '',

        image: null,
        images: [],
        isActive: true,
        newImage: null,
        newImages: [],
    });
    const navigate = useNavigate();
    const [backendService, setBackendService] = useState('');

    useEffect(() => {
        const fetchBackendService = () => {
            const env = process.env.NODE_ENV;
            const serviceUrl = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;
            setBackendService(serviceUrl);
        };

        fetchBackendService();
    }, []);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${backendService}/blog/${id}`);
                setBlogData(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        if (backendService) {
            fetchBlog();
        }
    }, [id, backendService]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value });
    };

    const handleImageChange = (e) => {
        setBlogData({ ...blogData, newImage: e.target.files[0] });
    };
    
    const handleImagesChange = (e) => {
        setBlogData({ ...blogData, newImages: Array.from(e.target.files) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', blogData.title);
        formData.append('content', blogData.content);
        formData.append('isActive', blogData.isActive);
        
        // Only append new image if it exists
        if (Array.isArray(blogData.newImages) && blogData.newImage) {
            formData.append('image', blogData.newImage);
        }
        
        // Only append new images if they exist
        if (Array.isArray(blogData.newImages) && blogData.newImages.length > 0) {
            blogData.newImages.forEach((image, index) => {
                formData.append(`images`, image);
            });
        }
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    
        try {
            const response = await axios.put(`${backendService}/blog/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                alert('blog updated successfully!');
                navigate("/blog");
            } else {
                alert(`Failed to update blog. Server responded with status ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                alert(`Failed to update blog. Server responded with status ${error.response.status}`);
            } else if (error.request) {
                alert('Failed to update blog. Check your network connection.');
            } else {
                alert('An unexpected error occurred while updating the blog.');
            }
        }
    };

    return (
        <Fragment>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />
                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        <div className="card-body">
                            <div className="card">
                                <div className="card-body">
                                    <div className="container">
                                        <h2>Edit blog</h2>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId="title">
                                                <Form.Label>Title:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="title"
                                                    value={blogData.title}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="content">
                                                <Form.Label>Content:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    name="content"
                                                    rows={6}
                                                    value={blogData.content}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="image">
                                                <Form.Label>Featured Image:</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    name="image"
                                                    onChange={handleImageChange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="images">
                                                <Form.Label>Other Images:</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    name="images"
                                                    multiple
                                                    onChange={handleImagesChange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="isActive">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="isActive"
                                                    label="Is Active"
                                                    checked={blogData.isActive}
                                                    onChange={(e) => setBlogData({ ...blogData, isActive: e.target.checked })}
                                                />
                                            </Form.Group>
                                            <Button type="submit" className="btn btn-primary">
                                                Update blog
                                            </Button>
                                        </Form>
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

export default BlogEdit;
