import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 

const UploadGuests = () => {
  const location = useLocation();
  const eventID = location.state?.eventID || "No Event ID";

  return (
    <div>
      <div className="header">
        <h1>Upload Guests</h1>
      </div>

      <div className="alert alert-info text-center">
        Event ID: <strong>{eventID}</strong>
      </div>

      <div className="card shadow-sm p-4">
        <div className="mb-3">
          <label htmlFor="csvFile" className="form-label fw-semibold">
            Upload CSV file:
          </label>
          <input
            type="file"
            accept=".csv"
            className="form-control"
            id="csvFile"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-4">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadGuests;
