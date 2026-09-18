import React from 'react';
import LessonToggle from './LessonToggle';
import ShowLesson from './ShowLesson';
import useResetLesson from '../Hook/useResetLesson';
import { Sparkles, RefreshCw } from 'lucide-react';

const UpdateVocabulary = () => {
  const toggleApi = 'https://english-window-server.vercel.app/levels';
  const showLessonApi = 'https://english-window-server.vercel.app/vocabulary/';
  useResetLesson();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white shadow-xl mb-10 p-6 sm:p-12 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 text-white border border-white/20">
            <RefreshCw size={16} className="text-cyan-300" />
            <span>Server Vocabulary Manager</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Update Your Vocabulary
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Manage, review, and practice custom vocabulary sets fetched directly from your cloud database.
          </p>
        </div>

        {/* LESSON TOGGLE */}
        <LessonToggle toggleApi={toggleApi} />

        {/* SHOW LESSON */}
        <ShowLesson showLessonApi={showLessonApi} />

      </div>
    </div>
  );
};

export default UpdateVocabulary;