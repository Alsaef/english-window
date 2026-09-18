import React from "react";
import about from '../assets/aboutus.jpg';
import { Sparkles, Target, Award, CheckCircle2, Heart } from 'lucide-react';

export default function AboutUs() {
  const values = [
    {
      title: "Effortless Learning",
      desc: "Designed from the ground up for native Bengali speakers to learn English vocabulary naturally."
    },
    {
      title: "Audio Pronunciation",
      desc: "Instant text-to-speech audio for every word and expression to build authentic speaking confidence."
    },
    {
      title: "Structured Lessons",
      desc: "Carefully organized levels from foundational everyday words to advanced smart spoken phrases."
    },
    {
      title: "100% Free Access",
      desc: "Complete access to notes, books, movie vocabulary, and smart English tables at zero cost."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* HERO BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white shadow-xl mb-12 p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 text-white border border-white/20">
            <Sparkles size={16} className="text-amber-300" />
            <span>Our Story & Mission</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            About English Window
          </h1>

          <p className="mt-4 text-base sm:text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Empowering students and language enthusiasts to master English vocabulary and speaking skills with clarity and joy.
          </p>
        </div>

        {/* FEATURE IMAGE */}
        <div className="w-full flex justify-center mb-12">
          <div className="p-2 bg-white rounded-3xl border border-slate-200 shadow-lg max-w-3xl overflow-hidden">
            <img src={about} alt="About English Window" className="w-full h-auto rounded-2xl object-cover" />
          </div>
        </div>

        {/* MISSION & VISION */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            Our Purpose & Vision
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
            Welcome to <strong className="text-indigo-600 font-bold">English Window</strong> — your digital companion for learning English vocabulary in an organized, straightforward, and engaging environment. Our mission is to bridge language barriers by delivering Bengali meanings, real-world usage examples, and accurate audio pronunciations.
          </p>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Whether you are preparing for academic examinations, job interviews, or striving for conversational fluency, our lessons and master notes are curated to support you every step of the way.
          </p>
        </div>

        {/* CORE VALUES GRID */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8">
            Why Choose English Window?
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{v.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
