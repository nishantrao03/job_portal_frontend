import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import AppliedJobBox from '../../components/JobBox/AppliedJobBox';

const AppliedJobs = () => {
  const user = useSelector((state) => state.user.user);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch(`http://localhost:8080/student/applied-jobs?rollNo=${user.rollNo}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`, // Assuming user.token is available
          }
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`No jobs applied by the user with roll number ${user.rollNo}.`);
          } else {
            throw new Error('An unexpected error occurred while fetching applied jobs.');
          }
        }

        const data = await response.json();
        setJobs(data);
        //console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [user.rollNo, user.token]);

  const handleDeleteJob = async (jobId) => {
    console.log("Deleting");

    try {
        const response = await fetch(`http://localhost:8080/student/delete-application?rollNo=${user.rollNo}&jobId=${jobId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json', // Ensure the header is set to JSON
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'An unexpected error occurred while deleting the application.');
        }

        const successMessage = await response.text();
        console.log(successMessage);

        // Update the jobs list after deletion
      setJobs((prevJobs) => prevJobs.filter(job => job.jobId !== jobId));

        // For example, you might want to remove the job from the list of jobs

    } catch (error) {
        console.error('Error:', error.message);
        // Optionally, update the state to show an error message
    }
};


  return (
    <div>
      <Navbar />
      <h2 style={{ 
        marginTop: '20px', 
        marginLeft: '3%',
        fontSize: '36px',
        marginBottom: '30px'
      }}>
        Applied Jobs
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && jobs.length > 0 && (
        jobs.map((job) => (
          <AppliedJobBox key={job.jobId} job={job} onDelete={handleDeleteJob} />
        ))
      )}
      <Footer />
    </div>
  );
};

export default AppliedJobs;
