import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import JobBox from '../../components/JobBox/JobBox';
import { useState, useEffect } from 'react';

const EligibleJobs = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to calculate graduation year
  const getGradYear = (rollNo) => {
    // Extract the first two characters and convert them to a full year
    const yearPrefix = rollNo.slice(0, 2);
    const joiningYear = parseInt(yearPrefix, 10) + 2000; // Convert to full year (e.g., "21" to 2021)
    const gradYear = joiningYear + 4; // Assuming duration is 4 years
    return gradYear;
  };

  useEffect(() => {
    const fetchEligibleJobs = async () => {
      try {

        const gradYear = getGradYear(user.rollNo);
        //console.log(gradYear);

        const queryParams = new URLSearchParams({
          gradYear: gradYear, // Replace with actual values
          degree: user.degree, // Replace with actual values
          branch: user.branch, // Replace with actual values
          cpi: user.cpi, // Replace with actual values
          gender: user.gender, // Replace with actual values (1 for male, 2 for female, etc.)
          rollNo: user.rollNo // Replace with actual roll number
        }).toString();
        console.log(queryParams);

        const response = await fetch(`http://localhost:8080/student/eligible-jobs?${queryParams}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}` // Add the token in the Authorization header
          }
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No jobs found for the provided criteria.');
          } else {
            throw new Error('An unexpected error occurred while fetching jobs.');
          }
        }

        const data = await response.json();
        setJobs(data);
        console.log(data);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEligibleJobs();
  }, [user.token]); // Add user.token as a dependency to rerun the effect if the token changes

  return (
    <div>
      <Navbar />
      <h2 style={{ 
        marginTop: '20px', 
        // marginLeft: '3%',
        fontSize: '36px',
        marginBottom: '30px'
      }}>
        Eligible Jobs
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && jobs.length > 0 && (
        jobs.map((job) => {
            const today = new Date();
            const applyByDate = new Date(job.deadline);

            // Render only jobs where applyBy date is today or in the future
            return applyByDate >= today ? (
              <JobBox key={job.jobId} job={job} />
            ) : null;
          })
      )}
      <Footer />
    </div>
  );
};

export default EligibleJobs;
