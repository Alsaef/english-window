import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Sparkles, BookOpen, Film, FileText, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center p-1">
                  <img src={logo} className="w-6 h-6 object-contain" alt="English Window Logo" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                English Window
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your free, friendly digital companion for mastering English vocabulary, pronunciation, grammar master notes, and smart spoken expressions.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Explore Learning
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/smart-english" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>Smart English</span>
                </Link>
              </li>
              <li>
                <Link to="/movies-vocab" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Film size={14} />
                  <span>Movie Vocabulary</span>
                </Link>
              </li>
              <li>
                <Link to="/grammar-vault" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <FileText size={14} />
                  <span>Grammar Vault Note</span>
                </Link>
              </li>
              <li>
                <Link to="/free-ebooks" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <BookOpen size={14} />
                  <span>Free Ebooks</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COMMUNITY & SUPPORT */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Resources & Help
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/test-exam" className="hover:text-indigo-400 transition-colors">
                  Take a Test / Exam
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/update-vocabulary" className="hover:text-indigo-400 transition-colors">
                  Update Vocabulary
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM DIVIDER & COPYRIGHT */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} English Window. All rights reserved.</p>
          
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart size={14} className="text-rose-500 fill-rose-500" />
            <span>by</span>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://developer-ratul.netlify.app/"
              className="text-slate-300 hover:text-indigo-400 font-semibold transition-colors ml-0.5"
            >
              Al Saef Ratul
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;