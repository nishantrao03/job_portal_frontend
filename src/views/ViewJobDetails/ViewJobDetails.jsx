import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ViewJobDetails.css';

function ViewJobDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { job } = location.state || {};

  const [qualifiedRounds, setQualifiedRounds] = useState(0);  // State to store the number of qualified rounds
  const [loading, setLoading] = useState(true);  // State to manage loading status

  useEffect(() => {
    if (job && user) {
      // Fetch the application details from the API with JWT authentication token
      fetch(`http://localhost:8080/student/get-application?rollNo=${user.rollNo}&jobId=${job.jobId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,  // Add the JWT token to the headers
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          setQualifiedRounds(data);
          console.log(data);  // Save the result in the qualifiedRounds state
          setLoading(false);  // Update loading status
        })
        .catch(() => {
          setQualifiedRounds(0);  // Set to 0 if there's an error
          setLoading(false);  // Update loading status
        });
    }
  }, [job, user]); // Effect runs when job changes

  // Determine if all rounds are qualified
  const allRoundsQualified = qualifiedRounds === job.numberOfRounds;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>No job details available. Please go back and try again.</div>;
  }

  return (
    <div className="job-details-page">
      <h1>Job Details</h1>
      <div className="job-info">
        <h2>{job.companyName}</h2>
        <p><strong>Job ID:</strong> {job.jobId}</p>
        <p><strong>Job Type:</strong> {job.jobType === 'i' ? 'Internship' : 'Job'}</p>
        <p><strong>Role:</strong> {job.role}</p>
        {job.jobType === 'i' ? (
          <p><strong>Stipend:</strong> {job.stipend}</p>
        ) : (
          <p><strong>Package:</strong> {job.pkg} LPA</p>
        )}
        <p><strong>Location:</strong> {job.location}</p>
        {job.duration && <p><strong>Duration:</strong> {job.duration} months</p>}
        <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
        <p>
          <strong>Company Details:</strong>{' '}
          <a href={job.companyDetails} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        </p>
        <p>
          <strong>Job Description:</strong>{' '}
          <a href={job.jobDescription} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        </p>
      </div>

      <div className="ph-member-info">
        <h3>PH Member Details</h3>
        <p><strong>Name:</strong> {job.phMemberName}</p>
        <p><strong>Phone:</strong> {job.phoneNumberStud}</p>
        <p><strong>Email:</strong> {job.instiMail}</p>
      </div>

      <div className="recruitment-rounds">
        <h3>Recruitment Rounds</h3>
        <div className="rounds-tracker">
          {job.recruitmentRounds.map((round, index) => (
            <div 
              key={index} 
              className={`recruitment-round ${index < qualifiedRounds ? 'completed' : 'upcoming'}`}  // Use qualifiedRounds to determine round status
            >
              <h4>Round {index + 1}: {round.roundType}</h4>
              <p><strong>Date:</strong> {round.date}</p>
              <p><strong>Time:</strong> {round.time}</p>
              <p><strong>Duration:</strong> {round.duration}</p>
              <p><strong>Description:</strong> {round.description}</p>
              <p><strong>Link/Venue:</strong> {round.linkOrVenue}</p>
              {index < qualifiedRounds && (
                <p className="congratulations-message">
                  Congratulations, you have qualified Round {index + 1}: {round.roundType}!
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      {allRoundsQualified && (
        <div className="congratulations-banner">
          <h3>
            Congratulations, you have been offered {job.jobType === 'i' ? 'an internship' : 'full-time employment'} at {job.companyName}!
          </h3>
        </div>
      )} 
      {/* <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button> */}
    </div>
  );
}

export default ViewJobDetails;
