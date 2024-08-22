import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import './JobBox.css'; // Using the same styles as JobBox

const AppliedJobBox = ({ job, onDelete }) => {
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

      const [isModalOpen, setIsModalOpen] = useState(false);
      const type = jobType === 'i' ? 'Internship' : jobType === 'j' ? 'Job' : 'N/A';
  // Parse the applyBy date string into a Date object
  const applyByDate = new Date(deadline);
  const currentDate = new Date();

  // Check if the deadline has passed
  const isDeadlinePassed = applyByDate < currentDate;

  // Format the applyBy date to a readable format
  const formattedApplyByDate = applyByDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDeleteClick = () => {
    setIsModalOpen(true);
};

const handleModalClose = () => {
    setIsModalOpen(false);
};

const handleConfirmDelete = () => {
    onDelete(jobId); // Call the delete function passed as a prop
    setIsModalOpen(false);
};

  return (
    <div className="job-box">
      <div className="logo-container">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
      </div>
      <div className="job-info">
        <div className="job-header">
          <span className="company-name">{companyName}</span>
          <span className="job-type"> • {type === 'i' ? 'Internship' : 'Job'}</span>
        </div>
        <div className="job-role">{role}</div>
        <div className="job-package">
          {pkg ? `Package: ${pkg} LPA` : `Stipend: ${stipend}`}
        </div>
        <div className="job-location">Location: {location}</div>
        {duration && (
          <div className="job-duration">Duration: {duration}</div>
        )}
      </div>
      <div className="apply-by">Apply By: {formattedApplyByDate}</div>
      <div className="action-buttons">
        <button className="action-button view">
        <Link to="/view-job" state={{ job: job }} >
            View
        </Link>
        </button>
      
        {!isDeadlinePassed && <button className="action-button update"><Link to="/job-register" state={{ jobId: jobId }} >
            Update
        </Link></button>}
        {/* <button className="action-button delete">Delete</button> */}
        <button className="action-button delete" onClick={handleDeleteClick}>Delete</button>

        
      </div>
      <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onConfirm={handleConfirmDelete}
            />
    </div>
  );
};

export default AppliedJobBox;
