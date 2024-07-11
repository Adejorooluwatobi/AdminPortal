import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from './Header';
import Sidebar from './Sidebar';

let backendService;

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ productName: "", productContent: "", value: "", productLeft: "", images: [] });
    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            let env = process.env.NODE_ENV;
            if (env === 'development') {
                backendService = process.env.REACT_APP_Backend_Url_Dev;
            } else {
                backendService = process.env.REACT_APP_Backend_Url_Prod;
            }
            try {
                const response = await axios.get(`${backendService}/product/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setNewImages(e.target.files);
    };

    const handleDisableClick = async () => {
        try {
            const env = process.env.NODE_ENV;
            const backendService = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;

            const response = await axios.put(`${backendService}/product/${id}/disable`);
            alert(response.data);
            setFormData((prev) => ({ ...prev, isActive: false }));
        } catch (error) {
            alert(`Error disabling product: ${error.message}`);
        }
    };

    const handleEnableClick = async () => {
        try {
            const env = process.env.NODE_ENV;
            const backendService = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;

            const response = await axios.put(`${backendService}/product/${id}/enable`);
            alert(response.data);
            setFormData((prev) => ({ ...prev, isActive: true }));
        } catch (error) {
            alert(`Error enabling product: ${error.message}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const env = process.env.NODE_ENV;
            const backendService = env === 'development' ? process.env.REACT_APP_Backend_Url_Dev : process.env.REACT_APP_Backend_Url_Prod;

            const updatedData = new FormData();
            updatedData.append('productName', formData.productName);
            updatedData.append('productContent', formData.productContent);
            updatedData.append('value', formData.value);
            updatedData.append('productLeft', formData.productLeft);
            if (newImages.length > 0) {
                Array.from(newImages).forEach(image => updatedData.append('images', image));
            }

            await axios.put(`${backendService}/product/${id}`, updatedData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Product updated successfully");
            navigate("/product");
        } catch (error) {
            console.error("Error updating product:", error);
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
                                                <h1 className="px-0">Edit Product</h1>
                                            </div>
                                            <div className="mb-5">
                                                <Button variant="primary" type="submit" className="btn btn-primary">
                                                    Save
                                                </Button>
                                            </div>
                                        </ul>
                                        <Form.Group className="mb-3" controlId="productName">
                                            <Form.Control
                                                type="text"
                                                required
                                                placeholder="Product Name"
                                                name="productName"
                                                value={formData.productName}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="productContent">
                                            <Form.Control
                                                as="textarea"
                                                required
                                                rows={5}
                                                placeholder="Product Content"
                                                name="productContent"
                                                value={formData.productContent}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="value">
                                            <Form.Control
                                                type="text"
                                                required
                                                placeholder="Value"
                                                name="value"
                                                value={formData.value}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="productLeft">
                                            <Form.Control
                                                type="number"
                                                required
                                                placeholder="Product Left"
                                                name="productLeft"
                                                value={formData.productLeft}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="images">
                                            <Form.Control type="file" multiple onChange={handleImageChange} />
                                        </Form.Group>
                                    </Form>
                                    {formData.images && formData.images.length > 0 && (
                                        <div className="mb-3">
                                            <h5>Current Images</h5>
                                            <div>
                                                {formData.images.map((image, index) => (
                                                    <img key={index} src={`${backendService}/${image}`} alt={formData.productName} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
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

export default EditProduct;
