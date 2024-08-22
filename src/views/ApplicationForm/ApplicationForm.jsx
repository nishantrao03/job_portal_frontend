import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./ApplicationForm.css";

function ApplicationForm() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate function
  const { jobId } = location.state || {};
  
  // Fetch user data from Redux
  const user = useSelector((state) => state.user.user);

  // Initial form data
  const [formData, setFormData] = useState({
    rollNo: user?.rollNo,
    personalMail: user?.personalMail || '',
    phoneNumber: user?.phoneNumber || '',
    cpi: user?.cpi || '',
    resume: user?.resume || '', // PDF link for resume
    linkedIn: user?.linkedin || '',
    coverLetter: '', // PDF link for cover letter
    jobId: jobId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/student/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.text();
      if (response.ok) {
        alert('Registration successful');
        navigate('/eligible-jobs'); // Redirect to /eligible-jobs
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit application');
    }
  };

  // Determine gender display
  const genderDisplay = user.gender === 0 ? 'Male' : user.gender === 1 ? 'Female' : 'Other';

  // Styling for read-only fields
  const readOnlyStyle = {
    color: '#A9A9A9', // Pale grey color
  };

  const requiredStyle = {
    color: 'red', // Red color for the * indicating required fields
  };

  return (
    <div>
      <h2>Submit Application</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Roll Number:
          <input type="text" name="rollNo" value={user.rollNo} readOnly style={readOnlyStyle} />
        </label>
        <label>
          First Name:
          <input type="text" name="firstName" value={user.firstName} readOnly style={readOnlyStyle} />
        </label>
        <label>
          Middle Name:
          <input type="text" name="middleName" value={user.middleName} readOnly style={readOnlyStyle} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={user.lastName} readOnly style={readOnlyStyle} />
        </label>
        <label>
          Institute Mail:
          <input type="email" name="instituteMail" value={user.instiMail} readOnly style={readOnlyStyle} />
        </label>
        <label>
          Personal Mail:<span style={requiredStyle}> *</span>
          <input type="email" name="personalMail" value={formData.personalMail} onChange={handleChange} required />
        </label>
        <label>
          Phone Number:<span style={requiredStyle}> *</span>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>
        <label>
          Gender:
          <input type="text" name="gender" value={genderDisplay} readOnly style={readOnlyStyle} />
        </label>
        <label>
          DOB:
          <input type="date" name="dob" value={user.dob} readOnly style={readOnlyStyle} />
        </label>
        <label>
          Degree:
          <input type="text" name="degree" value={user.degree} readOnly style={readOnlyStyle} />
        </label>
        <label>
          Branch:
          <input type="text" name="branch" value={user.branch} readOnly style={readOnlyStyle} />
        </label>
        <label>
          Tenth Percentage:
          <input type="text" name="tenthPercentage" value={user.tenthPercentage} readOnly style={readOnlyStyle} />
        </label>
        <label>
          Twelfth or Diploma Percentage:
          <input type="text" name="twelfthOrDiplomaPercentage" value={user.twelfthOrDiplomaPercentage} readOnly style={readOnlyStyle} />
        </label>
        <label>
          CPI:<span style={requiredStyle}> *</span>
          <input type="number" step="0.01" name="cpi" value={formData.cpi} onChange={handleChange} required />
        </label>
        <label>
          Resume (PDF link):<span style={requiredStyle}> *</span>
          <input type="text" name="resume" value={formData.resume} onChange={handleChange} required />
        </label>
        <label>
          LinkedIn:<span style={requiredStyle}> *</span>
          <input type="text" name="linkedIn" value={formData.linkedIn} onChange={handleChange} required />
        </label>
        <label>
          Cover Letter (PDF link):
          <input type="text" name="coverLetter" value={formData.coverLetter} onChange={handleChange}/>
        </label>

        {/* Submit button */}
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplicationForm;
