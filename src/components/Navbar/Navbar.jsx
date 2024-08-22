import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="app-name">CCDC Portal</Link>
      </div>
      <div className="navbar-middle">
        <div className="dropdown">
          <Link to="/" className="nav-link">Home</Link>
        </div>
        <div className="dropdown">
          <Link className="nav-link">On-campus Jobs</Link>
          <div className="dropdown-content">
            <Link to="/eligible-jobs">My Jobs</Link>
            <Link to="/applied-jobs">Applied Jobs</Link>
            <Link to="/qualified-jobs">Qualified Jobs</Link>
          </div>
        </div>
        <div className="dropdown">
          <Link to="/off-campus-jobs" className="nav-link">Off-campus Jobs</Link>
        </div>
        <div className="dropdown">
          <Link to="/ph-member-area" className="nav-link">PH Member Area</Link>
        </div>
        <div className="dropdown">
          <Link to="/admin-area" className="nav-link">Admin Area</Link>
        </div>
      </div>
      <div className="navbar-right">
        <div className="profile-dropdown">
          <div className="profile-circle"></div>
          <div className="profile-dropdown-content">
            <Link to="/edit-profile">Edit Profile</Link>
            <Link to="/logout">Log Out</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
