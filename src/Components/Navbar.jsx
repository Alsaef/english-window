import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { AuthContext } from '../Context/AuthProvider';
const Navbar = () => {
  const {user,logout}=useContext(AuthContext)
    const nav=<>
    <li><Link to={'/'}>Home</Link></li>
    <li><Link to={'/about'}>About Us</Link></li>
    <li><Link to={'/test-exam'}>Test | Exam</Link></li>
    <li><Link to={'contact'}>Contact US</Link></li>
    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm px-6">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {nav}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">
        <img src={logo} alt="" />
       <span className='lg:text-2xl text-xl font-semibold'>English Window</span>
    </a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {nav}
    </ul>
  </div>
  <div className="navbar-end">
{
  user? <button onClick={logout} className="btn  btn-error text-white">Logout</button>:<Link to={'/login'}> <a className="btn  border-[#422AD5] bg-white border-2">Login</a></Link>
}
  </div>
</div>
        </div>
    );
};

export default Navbar;