import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from './Header';
import Sidebar from './Sidebar';

let backendService;

function EditProgram() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: "", content: "" });

    useEffect(() => {
        const fetchProgram = async () => {
            let env = process.env.NODE_ENV;
            if (env === 'development') {
                backendService = process.env.REACT_APP_Backend_Url_Dev;
            }
            else {
                backendService = process.env.REACT_APP_Backend_Url_Prod;
            }
            try {
                const response = await axios.get(`${backendService}/program/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching program:", error);
            }
        };

        fetchProgram();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDisableClick = async () => {
        try {
            const env = process.env.NODE_ENV;
            const backendService = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;

            const response = await axios.put(`${backendService}/program/${id}/disable`);
            alert(response.data);
            setFormData((prev) => ({ ...prev, IsActive: false }));
        } catch (error) {
            alert(`Error disabling program: ${error.message}`);
        }
    };

    const handleEnableClick = async () => {
        try {
            const env = process.env.NODE_ENV;
            const backendService = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;

            const response = await axios.put(`${backendService}/program/${id}/enable`);
            alert(response.data);
            setFormData((prev) => ({ ...prev, IsActive: true }));
        } catch (error) {
            alert(`Error enabling program: ${error.message}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const env = process.env.NODE_ENV;
            const backendService = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;

            await axios.put(`${backendService}/program/${id}`, formData);
            alert("Program updated successfully");
            navigate("/program");
        } catch (error) {
            console.error("Error updating program:", error);
        }
    };

    return (
        <Fragment>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />
                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        <div className="card-body">
                            <div className="card">
                                <div className="card-body">
                                    <Form onSubmit={handleSubmit}>
                                        <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-between">
                                            <div>
                                                <h1 className="px-0">Edit Program</h1>
                                            </div>
                                            <div className="mb-5">
                                                <Button variant="primary" type="submit" className="btn btn-primary">
                                                    Save
                                                </Button>
                                            </div>
                                        </ul>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control
                                                type="text"
                                                required
                                                placeholder="Title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control
                                                as="textarea"
                                                required
                                                rows={5}
                                                placeholder="Content"
                                                name="content"
                                                value={formData.content}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Form>
                                    <span className="m-2">
                                        <Button className="btn btn-primary" onClick={handleEnableClick}>
                                            Enable
                                        </Button>
                                    </span>
                                    <span>
                                        <Button className="btn btn-primary" onClick={handleDisableClick}>
                                            Disable
                                        </Button>
                                    </span>
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

export default EditProgram;
