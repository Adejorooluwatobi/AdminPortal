import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';

let backendService;

const CardPaymentInfoPage = () => {
    const [payments, setPayments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState({});

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                if (process.env.NODE_ENV === 'development') {
                    backendService = process.env.REACT_APP_Backend_Url_Dev;
                } else {
                    backendService = process.env.REACT_APP_Backend_Url_Prod;
                }
                console.log('Backend URL:', backendService); // Log backend URL for debugging
                const response = await axios.get(`${backendService}/payment/list`);
                console.log('Payment data response:', response.data); // Log payment data for debugging
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, []); // Run once on component mount

    const handleOpenModal = (payment) => {
        setSelectedPayment(payment);
        setShowModal(true);
    };

    const handleDeletePayment = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
        try {
            await axios.delete(`${backendService}/payment/${id}`);
            // Remove the deleted payment from the state
            setPayments(payments.filter(payment => payment._id !== id));
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    }
    };

    return (
        <Fragment>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />
                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4 mt-9">Card Payment Information</h5>
                                <div className="table-responsive">
                                    <table className="table text-nowrap mb-0 align-middle">
                                        <thead className="text-dark fs-4">
                                            <tr>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Card Holder Name</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Card Number</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Expiration Date</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">CVV</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Actions</h6>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payments.map((payment, index) => (
                                                <tr key={index}>
                                                    <td>{payment.cardHolderName}</td>
                                                    <td>{payment.cardNumber}</td>
                                                    <td>{payment.expirationDate}</td>
                                                    <td>{payment.cvv}</td>
                                                    <td>
                                                        <Button variant="primary" onClick={() => handleOpenModal(payment)}>
                                                            View
                                                        </Button>
                                                        <Button variant="danger" onClick={() => handleDeletePayment(payment._id)}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Payment Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><strong>Card Holder Name:</strong> {selectedPayment.cardHolderName}</p>
                            <p><strong>Card Number:</strong> {selectedPayment.cardNumber}</p>
                            <p><strong>Expiration Date:</strong> {selectedPayment.expirationDate}</p>
                            <p><strong>CVV:</strong> {selectedPayment.cvv}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <script src="../assets/libs/jquery/dist/jquery.min.js"></script>
            <script src="../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
            <script src="../assets/js/sidebarmenu.js"></script>
            <script src="../assets/js/app.min.js"></script>
            <script src="../assets/libs/simplebar/dist/simplebar.js"></script>
        </Fragment>
    )
}

export default CardPaymentInfoPage;
