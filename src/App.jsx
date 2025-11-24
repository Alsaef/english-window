import React from 'react';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Footer from './Components/Footer';
import AboutUs from './Components/AboutUs';
import Test from './Components/Test';

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='min-h-screen'>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
         <Route path="/test-exam" element={<Test />} />
      </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;