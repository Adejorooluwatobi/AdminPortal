import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from './Header';
import Sidebar from './Sidebar';

let backendService;

const About = () => {
    const [aboutData, setAboutData] = useState({
        subtitle: '',
        title: '',
        content: '',
        signatory: '',
        others: [{ title: '', content: '' }],
    });

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                let env = process.env.NODE_ENV;
                backendService = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;

                const response = await axios.get(`${backendService}/about`);
                if (response.data && response.data.about) {
                    setAboutData(response.data.about);
                }
            } catch (error) {
                console.error('Error fetching About Us data:', error);
            }
        };

        fetchAboutData();
    }, []);

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
                                <Link to="/aboutEdit" className="btn btn-primary">Edit</Link>
                            </ul>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4 mt-9">ABOUT</h5>
                                <div className="text">
                                    <p><strong>Sub-Title:</strong> {aboutData.subtitle}</p>
                                    <p><strong>Title:</strong> {aboutData.title}</p>
                                    <p><strong>Content:</strong> {aboutData.content}</p>
                                    <p><strong>Signatory:</strong> {aboutData.signatory}</p>
                                    <br />
                                    <h3>Why Choose Us:</h3>
                                    <ul>
                                        {aboutData.others.map((item, index) => (
                                            <li key={index}>
                                                <strong>{item.title}:</strong>
                                                <br /> {item.content}
                                            </li>
                                        ))}
                                    </ul>
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

export default About;
