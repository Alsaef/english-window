import React from 'react';
import { BookMarked, Sparkles } from 'lucide-react';

const LessonNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-3xl border border-slate-200/80 shadow-sm max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 shadow-inner">
        <BookMarked size={32} />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
        Ready to start learning?
      </h3>
      <p className="mt-2 text-sm text-slate-500 max-w-sm">
        Please select any lesson above to view its vocabulary words, Bengali meanings, and audio pronunciation.
      </p>
      <div className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold text-indigo-600 bg-indigo-50/70 px-3 py-1 rounded-full">
        <Sparkles size={14} />
        <span>Lessons 1 to 10 are available</span>
      </div>
    </div>
  );
};

export default LessonNotFound;