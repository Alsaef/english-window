import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, Send, MessageSquare, Sparkles } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Contact Us | English Window Support</title>
        <meta name="description" content="Get in touch with English Window team for questions, suggestions, and learning support." />
      </Helmet>
      <div className="max-w-5xl mx-auto">
        
        {/* HERO BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white shadow-xl mb-12 p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 text-white border border-white/20">
            <MessageSquare size={16} className="text-cyan-300" />
            <span>We are here to help</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Contact English Window
          </h1>

          <p className="mt-4 text-base sm:text-lg text-indigo-100 max-w-xl mx-auto leading-relaxed">
            Have questions, feedback, or suggestions? Send us a message and our team will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* CONTACT INFO CARD */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xs border border-slate-200/90 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Get In Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</p>
                    <a href="mailto:support@englishwindow.com" className="text-base font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
                      support@englishwindow.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Location</p>
                    <p className="text-base font-semibold text-slate-800">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Learning Community
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Connect with thousands of active students practicing vocabulary and conversational speaking every day.
              </p>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xs border border-slate-200/90">
            {submitted && (
              <div className="alert alert-success mb-6 rounded-2xl text-white font-medium shadow-sm">
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
                  placeholder="How can we assist your English learning?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 hover:scale-102"
              >
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactUs;