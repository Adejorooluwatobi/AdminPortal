import React, { Fragment, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";

let backendService;

const NewArticle = () => {
    const [articleData, setArticleData] = useState({
        title: '',
        content: '',
        signatory: '',
        image: null,
        images: [],
        isActive: true,
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArticleData({ ...articleData, [name]: value });
    };

    const handleImageChange = (e) => {
        setArticleData({ ...articleData, image: e.target.files[0] });
    };

    const handleImagesChange = (e) => {
        setArticleData({ ...articleData, images: Array.from(e.target.files) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', articleData.title);
        formData.append('content', articleData.content);
        formData.append('signatory', articleData.signatory);
        formData.append('isActive', articleData.isActive);
        if (articleData.image) formData.append('image', articleData.image);
        articleData.images.forEach((image, index) => {
            formData.append('images', image);
        });

        try {
            let env = process.env.NODE_ENV;
            backendService = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;

            const response = await axios.post(`${backendService}/article`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                alert('Article added successfully!');
                navigate("/article");
            } else {
                alert(`Failed to add article. Server responded with status ${response.status}`);
            }
        } catch (error) {
            console.error('Error adding article:', error);
            if (error.response) {
                alert(`Failed to add article. Server responded with status ${error.response.status}`);
            } else if (error.request) {
                alert('Failed to add article. Check your network connection.');
            } else {
                alert('An unexpected error occurred while adding the article.');
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
                                        <h2>Add New Article</h2>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId="title">
                                                <Form.Label>Title:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="title"
                                                    value={articleData.title}
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
                                                    value={articleData.content}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="signatory">
                                                <Form.Label>Signatory:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="signatory"
                                                    value={articleData.signatory}
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
                                                    checked={articleData.isActive}
                                                    onChange={(e) => setArticleData({ ...articleData, isActive: e.target.checked })}
                                                />
                                            </Form.Group>
                                            <Button type="submit" className="btn btn-primary">
                                                Add Article
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

export default NewArticle;
