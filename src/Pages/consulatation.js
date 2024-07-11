/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';

let backendService;

const ConsultationInfoPage = () => {
    const [consultations, setConsultations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState('');

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                let env = process.env.NODE_ENV;
                if (env === 'development') {
                    backendService = process.env.REACT_APP_Backend_Url_Dev;
                }
                else {
                    backendService = process.env.REACT_APP_Backend_Url_Prod;
                }
                const response = await axios.get(`${backendService}/consultations/list`);
                const sortedConsultations = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setConsultations(sortedConsultations);
            } catch (error) {
                console.error('Error fetching consultations:', error);
            }
        };

        fetchConsultations();
    }, []); // Run once on component mount

    const handleOpenModal = (message) => {
        setSelectedMessage(message);
        setShowModal(true);
    };

    return (
        <Fragment>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />
                <div className="body-wrapper">
                    <Header />
                    <div class="container-fluid">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title fw-semibold mb-4 mt-9">Consultation Information</h5>
                                <div class="table-responsive">
                                    <table class="table text-nowrap mb-0 align-middle">
                                        <thead class="text-dark fs-4">
                                            <tr>
                                                <th class="border-bottom-0">
                                                    <h6 class="fw-semibold mb-0">Name</h6>
                                                </th>
                                                <th class="border-bottom-0">
                                                    <h6 class="fw-semibold mb-0">Phone Number</h6>
                                                </th>
                                                <th class="border-bottom-0">
                                                    <h6 class="fw-semibold mb-0">Email</h6>
                                                </th>
                                                <th class="border-bottom-0">
                                                    <h6 class="fw-semibold mb-0">Topic</h6>
                                                </th>
                                                <th class="border-bottom-0">
                                                    <h6 class="fw-semibold mb-0">Message</h6>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {consultations.map((consultation, index) => (
                                                <tr key={index}>
                                                    <td>{consultation.name}</td>
                                                    <td>{consultation.phoneNumber}</td>
                                                    <td>{consultation.email}</td>
                                                    <td>{consultation.topic}</td>
                                                    <Button variant="primary" onClick={() => handleOpenModal(consultation.message)}>
                                                        Read Message
                                                    </Button>
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
                            <Modal.Title>Message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{selectedMessage}</Modal.Body>
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
        </Fragment >
    )
}

export default ConsultationInfoPage;