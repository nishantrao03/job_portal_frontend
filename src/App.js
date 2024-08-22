import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './views/authviews/landing/landing';
import StudentRegistration from './views/authviews/student_registration/student_registration';
import Home from './views/home/home';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './redux/user/userSlice';
import { useState, useEffect } from 'react';
import EligibleJobs from './views/eligible_jobs/eligible_jobs';
import AppliedJobs from './views/applied_jobs/applied_jobs';
import QualifiedJobs from './views/qualified_jobs/qualified_jobs';
import ApplicationForm from './views/ApplicationForm/ApplicationForm';
import ViewJobDetails from './views/ViewJobDetails/ViewJobDetails';

function App() {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log(user);
  // const authenticated = async () => {
  //   console.log("Debug 0");
  //   if(user==null) return false;
  //   console.log("Debug");
  //   //check if the authentication token is expired or not, if expired, setUser to null and return false, else return true
  //   try {
  //     const response = await fetch('http://localhost:8080/auth/validate-token', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(user.token), // Assuming token is stored in user.token
  //     });

  //     if (response.ok) {
  //       // Token is valid
  //       console.log("Hihi haha huhu");
  //       return true;
  //     } else {
  //       // Token expired or invalid
  //       dispatch(setUser(null)); // Clear user state in Redux
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Error validating token:', error);
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const authStatus = await authenticated();
  //     setIsAuthenticated(authStatus);
  //   };

  //   checkAuth();
  // }, [user]);

  const authenticated = async () => {
    if (user == null) return false;
    try {
      const response = await fetch('http://localhost:8080/auth/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: user.token, // Assuming token is stored in user.token
      });

      if (response.ok) {
        return true;
      } else {
        dispatch(setUser(null)); // Clear user state in Redux
        return false;
      }
    } catch (error) {
      console.error('Error validating token:', error);
      dispatch(setUser(null)); // Clear user state in Redux
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await authenticated();
      setIsAuthenticated(authStatus);
      setIsLoading(false);
    };

    checkAuth();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner or any loading component
  }

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <LandingPage />} />
      <Route path="/register-student" element={isAuthenticated ? <Home /> : <StudentRegistration />}  />
      <Route path="/home" element={isAuthenticated ? <Home /> : <LandingPage />}  />
      <Route path="/eligible-jobs" element={isAuthenticated ? <EligibleJobs /> : <LandingPage />}  />
      <Route path="/applied-jobs" element={isAuthenticated ? <AppliedJobs /> : <LandingPage />}  />
      <Route path="/qualified-jobs" element={isAuthenticated ? <QualifiedJobs /> : <LandingPage />}  />
      <Route path="/job-register" element={isAuthenticated ? <ApplicationForm /> : <LandingPage />}  />
      <Route path="/view-job" element={isAuthenticated ? <ViewJobDetails /> : <LandingPage />}  />
      </Routes>
    </BrowserRouter>
  );
}

// const mapStateToProps = (state) => ({
//   user: state.user.user // Example: accessing 'user' state from Redux store
// });//used to import the value of the redux state variable

// const mapDispatchToProps = (dispatch) => ({
//   setUser: (userData) => dispatch({ type: 'SET_USER', payload: userData })
// });// used to set the value of a redux state variable

export default App;