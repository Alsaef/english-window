import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { AuthContext } from '../Context/AuthProvider';
import { 
  Home as HomeIcon, 
  Film, 
  FileText, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Mail, 
  PlusCircle, 
  LogIn, 
  LogOut, 
  Menu 
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Smart English', path: '/smart-english', icon: Sparkles, badge: 'New' },
    { name: 'Movie Vocab', path: '/movies-vocab', icon: Film },
    { name: 'Grammar Vault', path: '/grammar-vault', icon: FileText },
    { name: 'Free Ebooks', path: '/free-ebooks', icon: BookOpen },
    { name: 'Test | Exam', path: '/test-exam', icon: GraduationCap },
    { name: 'Contact', path: '/contact', icon: Mail },
    { name: 'Update Vocab', path: '/update-vocabulary', icon: PlusCircle },
  ];

  const renderNavItems = (isMobile = false) => (
    <>
      {navLinks.map((item) => {
        const isActive = location.pathname === item.path;
        const IconComponent = item.icon;

        return (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 font-medium'
              } ${isMobile ? 'py-3' : ''}`}
            >
              <IconComponent size={16} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'} />
              <span>{item.name}</span>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                  isActive ? 'bg-white text-indigo-700' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-xs transition-all">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* MOBILE MENU & LOGO */}
        <div className="navbar-start gap-2">
          <div className="dropdown lg:hidden">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost btn-circle btn-sm text-slate-700 hover:bg-slate-100"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white/95 backdrop-blur-lg rounded-2xl z-50 mt-3 w-64 p-3 shadow-2xl border border-slate-100 gap-1"
            >
              {renderNavItems(true)}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center p-1">
                <img src={logo} className="w-6 h-6 object-contain" alt="English Window Logo" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
                English Window
              </span>
              <span className="text-[10px] font-semibold text-slate-400 -mt-1 tracking-wider uppercase">
                Language Academy
              </span>
            </div>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1">
            {renderNavItems(false)}
          </ul>
        </div>

        {/* NAVBAR END / AUTH */}
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-800 truncate max-w-[140px]">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">Active Learner</span>
              </div>
              <button
                onClick={logout}
                className="btn btn-sm rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 shadow-xs flex items-center gap-1.5 transition-all"
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold shadow-md shadow-indigo-500/20 border-none px-5 flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <LogIn size={15} />
              <span>Login</span>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;