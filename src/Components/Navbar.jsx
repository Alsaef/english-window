import React, { useContext, useState, useEffect, useRef } from 'react';
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
  Menu,
  X,
  CheckCircle2,
  ChevronDown,
  Info
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  // Primary links visible on desktop header
  const primaryLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Sentence Checker', path: '/sentence-checker', icon: CheckCircle2, badge: 'AI' },
    { name: 'Smart English', path: '/smart-english', icon: Sparkles, badge: 'New' },
    { name: 'Movie Vocab', path: '/movies-vocab', icon: Film },
    { name: 'Grammar Vault', path: '/grammar-vault', icon: FileText },
  ];

  // Secondary links placed inside "More" dropdown on desktop
  const moreLinks = [
    { name: 'Free Ebooks', path: '/free-ebooks', icon: BookOpen, desc: 'Grammar & vocabulary PDFs' },
    { name: 'Test | Exam', path: '/test-exam', icon: GraduationCap, desc: 'MCQ quizzes & evaluations' },
    { name: 'About Us', path: '/about', icon: Info, desc: 'Our mission and team' },
    { name: 'Contact', path: '/contact', icon: Mail, desc: 'Get in touch with support' },
    { name: 'Update Vocab', path: '/update-vocabulary', icon: PlusCircle, desc: 'Manage lesson vocabulary' },
  ];

  const isMoreActive = moreLinks.some((item) => location.pathname === item.path);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* LEFT: LOGO & MOBILE HAMBURGER BUTTON */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* MOBILE HAMBURGER TOGGLE */}
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-100"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* BRAND LOGO */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center p-1">
                  <img src={logo} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" alt="English Window Logo" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent leading-tight">
                  English Window
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 tracking-wider uppercase hidden xs:inline">
                  Language Academy
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER: DESKTOP NAVIGATION MENU (Responsive, non-breaking) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {primaryLinks.map((item) => {
              const isActive = location.pathname === item.path;
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm transition-all duration-200 whitespace-nowrap font-medium ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-200'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
                  }`}
                >
                  <IconComponent size={15} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`text-[9px] xl:text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                      isActive ? 'bg-white text-indigo-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* "MORE" DROPDOWN */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm transition-all duration-200 whitespace-nowrap font-medium ${
                  isMoreActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/80'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
                }`}
                aria-haspopup="true"
                aria-expanded={moreOpen}
              >
                <span>More</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${moreOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
              </button>

              {/* DROPDOWN MENU */}
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    More Resources &amp; Info
                  </div>
                  <div className="space-y-1">
                    {moreLinks.map((item) => {
                      const isActive = location.pathname === item.path;
                      const IconComponent = item.icon;

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMoreOpen(false)}
                          className={`flex items-start gap-2.5 p-2 rounded-xl text-xs transition-all ${
                            isActive
                              ? 'bg-indigo-50 text-indigo-700 font-semibold'
                              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                            <IconComponent size={14} />
                          </div>
                          <div>
                            <div className="font-semibold">{item.name}</div>
                            {item.desc && <div className="text-[11px] text-slate-400 font-normal">{item.desc}</div>}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* RIGHT: AUTH & ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Active Learner</span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-xs sm:btn-sm rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 shadow-2xs flex items-center gap-1.5 px-3 transition-all"
                  title="Logout"
                >
                  <LogOut size={14} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-xs sm:btn-sm rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold shadow-sm shadow-indigo-500/20 border-none px-3.5 sm:px-4 flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <LogIn size={14} />
                <span>Login</span>
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE FULL-DRAWER / SLIDE-DOWN MENU */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-[65px] bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl z-50 max-h-[calc(100vh-70px)] overflow-y-auto px-4 py-5 animate-in fade-in slide-in-from-top-2 space-y-5">
            {/* CORE LEARNING */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
                Core Learning &amp; AI
              </div>
              <ul className="space-y-1">
                {primaryLinks.map((item) => {
                  const isActive = location.pathname === item.path;
                  const IconComponent = item.icon;

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-indigo-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            isActive ? 'bg-white text-indigo-700' : 'bg-indigo-100 text-indigo-700'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* MORE RESOURCES */}
            <div className="space-y-1 border-t border-slate-100 pt-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
                Resources &amp; Support
              </div>
              <ul className="space-y-1">
                {moreLinks.map((item) => {
                  const isActive = location.pathname === item.path;
                  const IconComponent = item.icon;

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-700 font-semibold'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-indigo-600'
                        }`}
                      >
                        <IconComponent size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                        <div>
                          <div>{item.name}</div>
                          {item.desc && <div className="text-xs text-slate-400 font-normal">{item.desc}</div>}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* MOBILE USER / AUTH SECTION */}
            <div className="border-t border-slate-100 pt-3 px-2">
              {user ? (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">
                      {user.displayName || user.email}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Active Learner</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="btn btn-xs rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-sm w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-md flex items-center justify-center gap-2"
                >
                  <LogIn size={15} />
                  <span>Login / Register</span>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;