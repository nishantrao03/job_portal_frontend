import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './JobBox.css'; // Ensure you have your styles in this file

const JobBox = ({ job }) => {
  // Destructure job details from the prop
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    jobId,
    companyName,
    jobType,
    role,
    pkg, // Renamed 'package' to 'jobPackage' to avoid keyword conflict
    location,
    duration,
    deadline,
    stipend,
    companyLogo
  } = job;

  const type = jobType === 'i' ? 'Internship' : jobType === 'j' ? 'Job' : 'N/A';
  

  // Parse the applyBy date string into a Date object
  const applyByDate = new Date(deadline);

  // Format the applyBy date to a readable format
  const formattedApplyByDate = applyByDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="job-box">
      <div className="logo-container">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
      </div>
      <div className="job-info">
        <div className="job-header">
          <span className="company-name">{companyName}</span>
          <span className="job-type"> • {type}</span>
        </div>
        <div className="job-role">{role}</div>
        <div className="job-package">
          {pkg ? `Package: ${pkg} LPA` : `Stipend: ${stipend}`}
        </div>
        <div className="job-location">Location: {location}</div>
        {duration && (
          <div className="job-duration">Duration: {duration} months</div>
        )}
      </div>
      <div className="apply-by">Apply By: {formattedApplyByDate}</div>
      <div className="action-buttons">
      {/* <button className="action-button view" onClick={openModal}>
          View
        </button> */}
        <button className="action-button view">
        <Link to="/view-job" state={{ job: job }} >
            View
        </Link>
        </button>
        <button className="action-button update"><Link to="/job-register" state={{ jobId: jobId }} >
            Apply
        </Link></button>
      </div>
    </div>
  );
};

export default JobBox;
