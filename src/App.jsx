import React from 'react';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Footer from './Components/Footer';
import AboutUs from './Components/AboutUs';
import Test from './Components/Test';
import Login from './Components/Login';
import Register from './Components/Register';
import ContactUs from './Components/ContactUs';
import Private from './Private/Private';
import UpdateVocabulary from './Components/UpdateVocabulary';

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='min-h-screen'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/test-exam" element={<Private>
            <Test />
          </Private>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactUs />} />
           <Route path="/update-vocabulary" element={<UpdateVocabulary />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;