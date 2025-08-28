import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const ViewEvents = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost/php-crud-rest-api-main/api.php")
            .then((res) => {
                const apiData = Array.isArray(res.data.data) ? res.data.data : [];
                setData(apiData);
                console.log(apiData);
            })
            .catch(() => {
                setData([]);
            });
    }, []);

    // Filter data by search term
    const filteredData = data.filter(
        (row) =>
            row.host_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

    // Handle page changes
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <div className="header mb-4">
                <h1>View Events</h1>
            </div>
            <div className="justify-content-center d-flex flex-column align-items-center p-3">
                <input
                    className="form-control w-25 mb-3"
                    type="text"
                    placeholder="Search by Host name"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <div className="table-responsive">
                    <table className="table table-striped table-bordered w-auto p-3 mt-3">
                        <thead>
                            <tr className="bg-light">
                                <th>eventID</th>
                                <th>Host Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.event_id}</td>
                                        <td>{row.host_name}</td>
                                        <td>{row.address}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() =>
                                                    navigate("/upload-guests", {
                                                        state: { eventID: row.event_id },
                                                    })
                                                }
                                            >
                                                <FontAwesomeIcon icon={faUpload} /> Upload Guests
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Controls */}
                <div className="mt-2">
                    <button
                        className="btn btn-primary mx-1"
                        aria-label="Previous Page"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} /> Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            className={`btn btn-primary mx-1${currentPage === i + 1 ? " fw-bold" : ""}`}
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            aria-label={`Go to page ${i + 1}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="btn btn-primary mx-1"
                        aria-label="Next Page"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        <FontAwesomeIcon icon={faAngleRight} /> Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewEvents;