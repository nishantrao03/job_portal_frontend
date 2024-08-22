import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import QualifiedJobBox from '../../components/JobBox/QualifiedJobBox';

const QualifiedJobs = () => {
  const user = useSelector((state) => state.user.user);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQualifiedJobs = async () => {
      try {
        const response = await fetch(`http://localhost:8080/student/qualified-jobs?rollNo=${user.rollNo}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`, // Assuming user.token is available
          }
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`No jobs qualified by the user with roll number ${user.rollNo}.`);
          } else {
            throw new Error('An unexpected error occurred while fetching qualified jobs.');
          }
        }

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQualifiedJobs();
  }, [user.rollNo, user.token]);

  return (
    <div>
      <Navbar />
      <h2 style={{ 
        marginTop: '20px', 
        marginLeft: '3%',
        fontSize: '36px',
        marginBottom: '30px'
      }}>
        Qualified Jobs
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && jobs.length > 0 && (
        jobs.map((job) => (
          <QualifiedJobBox key={job.jobId} job={job} />
        ))
      )}
      <Footer />
    </div>
  );
};

export default QualifiedJobs;
