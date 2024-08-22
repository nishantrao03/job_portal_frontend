import React from 'react';
import { Link } from 'react-router-dom';
import StudentRegistration from '../student_registration/student_registration';
import "./landing.css";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/user/userSlice';
import backgroundImage from '../../../assets/black_blue_bg.jpg';

const LandingPage = () => {
  const [rollno, setRollno] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const loginData = {
      rollno: rollno,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);
        dispatch(setUser(result)); // Save the user data to Redux store
      } else {
        const errorText = await response.text();
        console.error('Login failed:', errorText);
        alert('Login failed: ' + errorText);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleRollnoChange = (e) => {
    setRollno(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="landing-page" >
      {/* style={{ backgroundImage: `url(${backgroundImage})` }} */}
      <h1>Welcome to CCDC Portal</h1> 
      <div className="existing-user">
        <h2>Existing user?</h2>
        <div>
          <input type="text" placeholder="Roll No" className="login-input" value={rollno} onChange={handleRollnoChange}/>
        </div>
        <div>
          <input type="password" placeholder="Password" className="login-input" value={password} onChange={handlePasswordChange}/>
        </div>
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
      <div className="new-user">
        <h2>New user?</h2>
        <Link to="/register-student" className="student-button">Student</Link>
          <Link to="/register-student" className="alumni-button">Alumni</Link>
      </div>
    </div>
  );
};

export default LandingPage;
