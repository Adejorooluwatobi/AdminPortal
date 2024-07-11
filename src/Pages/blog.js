import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from './Header';
import Sidebar from './Sidebar';

let backendService;

const Blog = () => {
    const [blog, setblog] = useState([]);

    useEffect(() => {
        const fetchblog = async () => {
            try {
                let env = process.env.NODE_ENV;
                backendService = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;

                const response = await axios.get(`${backendService}/blog`);
                setblog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchblog();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendService}/blog/${id}`);
            setblog(blog.filter(blog => blog._id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
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
                        <div className="navbar-collapse justify-content-end px-0 mb-9" id="navbarNav">
                            <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                                <Link to="/blogNew" className="btn btn-primary">Add New blog</Link>
                            </ul>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4 mt-9">blog</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Content</th>
                                            <th>Status</th>
                                            <th>Featured Image</th>
                                            <th>Additional Images</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blog.map((blog) => (
                                            <tr key={blog._id}>
                                                <td>{blog.title}</td>
                                                <td>{blog.content}</td>
                                                <td>{blog.isActive ? "Active" : "Inactive"}</td>
                                                <td>
                                                    {blog.image && (
                                                        <img 
                                                            src={`${backendService}/${blog.image}`} 
                                                            alt="Featured" 
                                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                                        />
                                                    )}
                                                </td>
                                                <td>
                                                    {blog.images && blog.images.map((image, index) => (
                                                        <img 
                                                            key={index}
                                                            src={`${backendService}/${image}`} 
                                                            alt={`Additional ${index}`} 
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover', margin: '5px' }} 
                                                        />
                                                    ))}
                                                </td>
                                                <td>
                                                    <Link to={`/blogEdit/${blog._id}`} className="btn btn-primary">Edit</Link>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(blog._id)}>Delete</button>
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
            <script src="../assets/libs/jquery/dist/jquery.min.js"></script>
            <script src="../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
            <script src="../assets/js/sidebarmenu.js"></script>
            <script src="../assets/js/app.min.js"></script>
            <script src="../assets/libs/simplebar/dist/simplebar.js"></script>
        </Fragment>
    );
};

export default Blog;
