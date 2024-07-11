import React, { Fragment, useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";

let backendService;

const AboutEdit = () => {
    const [aboutData, setAboutData] = useState({
        subtitle: '',
        title: '',
        content: '',
        signatory: '',
        others: [{ title: '', content: '' }],
    });
    const navigate = useNavigate();

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
                console.error('Error fetching About data:', error);
            }
        };

        fetchAboutData();
    }, []);

    const handleInputChange = (e, index, field) => {
        const { value } = e.target;
        const updatedOthers = [...aboutData.others];
        updatedOthers[index][field] = value;
        setAboutData({ ...aboutData, others: updatedOthers });
    };

    const handleSubTitleChange = (e) => {
        setAboutData({ ...aboutData, subtitle: e.target.value });
    };

    const handleTitleOrSignatoryChange = (e) => {
        const { name, value } = e.target;
        setAboutData({ ...aboutData, [name]: value });
    };

    const handleContentChange = (e) => {
        setAboutData({ ...aboutData, content: e.target.value });
    };

    const addOthersItem = () => {
        setAboutData({
            ...aboutData,
            others: [...aboutData.others, { title: '', content: '' }],
        });
    };

    const removeOthersItem = (index) => {
        const updatedOthers = [...aboutData.others];
        updatedOthers.splice(index, 1);
        setAboutData({ ...aboutData, others: updatedOthers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`${backendService}/about`, aboutData);
            if (response.status === 200) {
                alert('About content updated successfully!');
                navigate("/about");
            } else {
                alert(`Failed to update About content. Server responded with status ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating About content:', error);
            if (error.response) {
                alert(`Failed to update About content. Server responded with status ${error.response.status}`);
            } else if (error.request) {
                alert('Failed to update About content. Check your network connection.');
            } else {
                alert('An unexpected error occurred while updating About content.');
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
                                        <h2>Edit About</h2>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId="subtitle">
                                                <Form.Label>Sub-Title:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="subtitle"
                                                    value={aboutData.subtitle}
                                                    onChange={handleSubTitleChange}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="title">
                                                <Form.Label>Title:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="title"
                                                    value={aboutData.title}
                                                    onChange={handleTitleOrSignatoryChange}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="aboutUsContent">
                                                <Form.Label>About Us Content:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    name="content"
                                                    rows={6}
                                                    value={aboutData.content}
                                                    onChange={handleContentChange}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="signatory">
                                                <Form.Label>Signatory:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="signatory"
                                                    value={aboutData.signatory}
                                                    onChange={handleTitleOrSignatoryChange}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="others">
                                                <Form.Label>
                                                    <h3>Others:</h3>
                                                </Form.Label>
                                                {aboutData.others.map((item, index) => (
                                                    <div key={index}>
                                                        <Form.Group controlId={`othersTitle${index}`}>
                                                            <Form.Label>Title:</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                value={item.title}
                                                                onChange={(e) => handleInputChange(e, index, 'title')}
                                                                required
                                                            />
                                                        </Form.Group>
                                                        <Form.Group controlId={`othersContent${index}`}>
                                                            <Form.Label>Content:</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                value={item.content}
                                                                onChange={(e) => handleInputChange(e, index, 'content')}
                                                                required
                                                            />
                                                        </Form.Group>
                                                        <Button variant="danger" onClick={() => removeOthersItem(index)}>
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button variant="primary" onClick={addOthersItem}>
                                                    Add Why Choose Us
                                                </Button>
                                            </Form.Group>
                                            <Button type="submit" className="btn btn-primary">
                                                Update About
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
        </Fragment >
    );
};

export default AboutEdit;
