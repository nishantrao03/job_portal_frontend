import React, { useState } from 'react';
import './student_registration.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/user/userSlice';
import backgroundImage from '../../../assets/black_blue_bg.jpg';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    rollNo: '',
    instiMail: '',
    personalMail: '',
    degree: '',
    branch: '',
    cpi: '',
    resume: '',
    linkedin: '',
    phoneNumber: '',
    password: '',
    code: '',
    gender: '',
    tenthPercentage: '',
    twelfthOrDiplomaPercentage: ''
  });

  const dispatch = useDispatch();
  const [branches, setBranches] = useState([]);
  const [verificationStep, setVerificationStep] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const degreeBranches = {
    BTech: [
      { branch_id: 'CSE', branch_name: 'Computer Science and Engineering' },
      { branch_id: 'EE', branch_name: 'Electrical Engineering' },
      { branch_id: 'ME', branch_name: 'Mechanical Engineering' }
    ],
    BSc: [
      { branch_id: 'CSE', branch_name: 'Computer Science and Engineering' },
      { branch_id: 'EE', branch_name: 'Electrical Engineering' },
      { branch_id: 'ME', branch_name: 'Mechanical Engineering' }
    ],
    MTech: [
      { branch_id: 'CSE', branch_name: 'Computer Science and Engineering' },
      { branch_id: 'EE', branch_name: 'Electrical Engineering' },
      { branch_id: 'ME', branch_name: 'Mechanical Engineering' }
    ],
    MSc: [
      { branch_id: 'CSE', branch_name: 'Computer Science and Engineering' },
      { branch_id: 'EE', branch_name: 'Electrical Engineering' },
      { branch_id: 'ME', branch_name: 'Mechanical Engineering' }
    ],
    PhD: [
      { branch_id: 'CSE', branch_name: 'Computer Science and Engineering' },
      { branch_id: 'EE', branch_name: 'Electrical Engineering' },
      { branch_id: 'ME', branch_name: 'Mechanical Engineering' }
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDegreeChange = (e) => {
    const selectedDegree = e.target.value;
    setFormData({ ...formData, degree: selectedDegree, branch: '' });
    setBranches(degreeBranches[selectedDegree] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.instiMail.endsWith('@gmail.com')) {
      alert('Institute email must end with @gmail.com'); //change later to insti id
      return;
    }
    if (formData.password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: formData.instiMail
      });
      const result = await response.text();
      if (response.ok) {
        alert(result);
        setVerificationStep(true);
      } else {
        alert('Failed to send verification code');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        alert('Registration successful');
        dispatch(setUser(result));
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="container">
      <h2>Student Registration</h2>
      <form onSubmit={verificationStep ? handleVerificationSubmit : handleSubmit}>
        <div>
          <label>First Name*</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Middle Name</label>
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name*</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div>
          <label>Roll Number</label>
          <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required />
        </div>
        <div>
          <label>Institute Mail</label>
          <input type="email" name="instiMail" value={formData.instiMail} onChange={handleChange} required />
        </div>
        <div>
          <label>Personal Mail</label>
          <input type="email" name="personalMail" value={formData.personalMail} onChange={handleChange} required />
        </div>
        <div>
          <label>Degree</label>
          <select name="degree" value={formData.degree} onChange={handleDegreeChange} required>
            <option value="">Select Degree</option>
            <option value="BTech">BTech</option>
            <option value="BSc">BSc</option>
            <option value="MTech">MTech</option>
            <option value="MSc">MSc</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div>
          <label>Branch</label>
          <select name="branch" value={formData.branch} onChange={handleChange} required>
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch.branch_id} value={branch.branch_name}>
                {branch.branch_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>CPI till last semester</label>
          <input type="number" step="0.01" name="cpi" value={formData.cpi} onChange={handleChange} required />
        </div>
        <div>
          <label>Resume (G-Drive link)</label>
          <input type="url" name="resume" value={formData.resume} onChange={handleChange} required />
        </div>
        <div>
          <label>LinkedIn Link</label>
          <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Set Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={handlePasswordChange} required />
        </div>
        <div>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>
        <div>
          <label>10th Percentage</label>
          <input type="number" step="0.01" name="tenthPercentage" value={formData.tenthPercentage} onChange={handleChange} required />
        </div>
        <div>
          <label>12th or Diploma Percentage</label>
          <input type="number" step="0.01" name="twelfthOrDiplomaPercentage" value={formData.twelfthOrDiplomaPercentage} onChange={handleChange} required />
        </div>
        {verificationStep && (
          <div>
            <label>Verification Code</label>
            <input type="text" name="code" value={formData.code} onChange={handleChange} required />
          </div>
        )}
        <button type="submit">{verificationStep ? 'Verify Code and Register' : 'Register'}</button>
      </form>
    </div>
  );
};

export default StudentRegistration;
