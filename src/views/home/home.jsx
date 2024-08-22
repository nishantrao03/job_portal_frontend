import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/user/userSlice';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import JobBox from '../../components/JobBox/JobBox';

const Home = () => {
    //console.log("Badhai ho, successfully kaam kar raha hai");
    const dispatch = useDispatch();
    //dispatch(setUser(null));
  return (
    <div>
    <Navbar />
    {/* <h2 style={{ 
                // textAlign: 'center', 
                marginTop: '20px', 
                marginLeft: '3%',
                fontSize: '36px', // Reduce the font size
                marginBottom: '30px' // Add spacing between header and JobBox
            }}>
                Eligible Jobs
            </h2>
            
    <JobBox />
    <JobBox /> */}
    <Footer />
</div>

  )
}

export default Home;
