import React, { useContext, useEffect } from 'react';
import { lessonContext } from '../Context/LessonProvider';
import { BookOpen } from 'lucide-react';

const LessonToggle = ({ toggleApi }) => {
  const { toggleBtn, setselectLesson, selectLesson, fetchToggleFn } = useContext(lessonContext);

  const handleFetchLesson = (level) => {
    setselectLesson(level);
  };

  useEffect(() => {
    fetchToggleFn(`${toggleApi}`);
  }, [toggleApi]);

  return (
    <div className="mb-10">
      <div className="flex flex-wrap gap-2.5 justify-center max-w-4xl mx-auto">
        {toggleBtn.map((btn) => {
          const isSelected = selectLesson === btn.level_no;

          return (
            <button
              onClick={() => handleFetchLesson(btn.level_no)}
              key={btn.id}
              className={`btn btn-sm sm:btn-md rounded-2xl font-bold px-4 py-2 transition-all duration-200 flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 scale-105 border-none'
                  : 'bg-white hover:bg-indigo-50/70 border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 shadow-xs'
              }`}
            >
              <BookOpen size={16} className={isSelected ? 'text-white' : 'text-indigo-500'} />
              <span>Lesson {btn.level_no}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LessonToggle;