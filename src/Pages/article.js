import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from './Header';
import Sidebar from './Sidebar';

let backendService;

const Article = () => {
    const [article, setArticle] = useState([]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                let env = process.env.NODE_ENV;
                backendService = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;

                const response = await axios.get(`${backendService}/article`);
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendService}/article/${id}`);
            setArticle(article.filter(article => article._id !== id));
        } catch (error) {
            console.error('Error deleting article:', error);
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
                                <Link to="/articleNew" className="btn btn-primary">Add New Article</Link>
                            </ul>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4 mt-9">ARTICLE</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Content</th>
                                            <th>Signatory</th>
                                            <th>Status</th>
                                            <th>Featured Image</th>
                                            <th>Additional Images</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {article.map((article) => (
                                            <tr key={article._id}>
                                                <td>{article.title}</td>
                                                <td>{article.content}</td>
                                                <td>{article.signatory}</td>
                                                <td>{article.isActive ? "Active" : "Inactive"}</td>
                                                <td>
                                                    {article.image && (
                                                        <img 
                                                            src={`${backendService}/${article.image}`} 
                                                            alt="Featured" 
                                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                                        />
                                                    )}
                                                </td>
                                                <td>
                                                    {article.images && article.images.map((image, index) => (
                                                        <img 
                                                            key={index}
                                                            src={`${backendService}/${image}`} 
                                                            alt={`Additional ${index}`} 
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover', margin: '5px' }} 
                                                        />
                                                    ))}
                                                </td>
                                                <td>
                                                    <Link to={`/articleEdit/${article._id}`} className="btn btn-primary">Edit</Link>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(article._id)}>Delete</button>
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

export default Article;
