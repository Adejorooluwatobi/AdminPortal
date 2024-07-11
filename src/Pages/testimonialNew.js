import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';

const TestimonialNew = () => {
    const [testimonialData, setTestimonialData] = useState({
        name: '',
        position: '',
        content: ''
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTestimonialData({ ...testimonialData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendService}/testimonial`, testimonialData);
            if (response.status === 200) {
                alert('Testimonial added successfully!');
                navigate("/testimonial");
            } else {
                alert(`Failed to add testimonial. Server responded with status ${response.status}`);
            }
        } catch (error) {
            console.error('Error adding testimonial:', error);
            if (error.response) {
                alert(`Failed to add testimonial. Server responded with status ${error.response.status}`);
            } else if (error.request) {
                alert('Failed to add testimonial. Check your network connection.');
            } else {
                alert('An unexpected error occurred while adding the testimonial.');
            }
        }
    };

    return (
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
                                    <h2>Add New Testimonial</h2>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="name">
                                            <Form.Label>Name:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={testimonialData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="position">
                                            <Form.Label>Position:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="position"
                                                value={testimonialData.position}
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
                                                value={testimonialData.content}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Button type="submit" className="btn btn-primary">
                                            Add Testimonial
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialNew;
