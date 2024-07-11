import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';

const Testimonial = () => {
    const [testimonial, setTestimonial] = useState([]);
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
        const fetchTestimonial = async () => {
            try {
                const response = await axios.get(`${backendService}/testimonial`);
                console.log('Fetched testimonials:', response.data); // Add this line
                setTestimonial(response.data);
            } catch (error) {
                console.error('Error fetching testimonial:', error);
            }
        };

        if (backendService) {
            fetchTestimonial();
        }
    }, [backendService]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendService}/testimonial/${id}`);
            setTestimonial(testimonial.filter(testimonial => testimonial._id !== id));
        } catch (error) {
            console.error('Error deleting testimonial:', error);
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
                                    <h2>Testimonial</h2>
                                    <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                                        <Link to="/testimonialNew" className="btn btn-primary">New Testimonial</Link>
                                    </ul>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Content</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {testimonial.map(testimonial => (
                                                <tr key={testimonial._id}>
                                                    <td>{testimonial.name}</td>
                                                    <td>{testimonial.position}</td>
                                                    <td>{testimonial.content}</td>
                                                    <td>
                                                        <Link to={`/testimonialEdit/${testimonial._id}`} className="btn btn-primary">Edit</Link>
                                                        <Button variant="danger" onClick={() => handleDelete(testimonial._id)}>Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
