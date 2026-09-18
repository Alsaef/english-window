import React, { useContext, useEffect } from 'react';
import { lessonContext } from '../Context/LessonProvider';
import { AlertCircle } from 'lucide-react';
import VocabularyCard from './VocabularyCard';
import Loading from './Loading';
import LessonNotFound from './LessonNotFound';

const ShowLesson = ({ showLessonApi }) => {
  const { selectLesson, loading, fetchShowlesson, showLesson } = useContext(lessonContext);

  useEffect(() => {
    if (selectLesson) {
      fetchShowlesson(`${showLessonApi}${selectLesson}`);
    }
  }, [selectLesson, showLessonApi]);

  if (loading) {
    return <Loading />;
  }

  if (!selectLesson) {
    return <LessonNotFound />;
  }

  if (!showLesson || showLesson.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-3xl border border-slate-200 shadow-sm max-w-lg mx-auto">
        <div className="w-16 h-16 flex items-center justify-center bg-amber-50 text-amber-600 rounded-2xl mb-4">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">
          No words in Lesson {selectLesson} yet
        </h3>
        <p className="mt-1.5 text-sm text-slate-500">
          Please select another lesson from the list above.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-2 pb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <span>Lesson {selectLesson} Words</span>
          <span className="badge badge-primary badge-sm font-semibold">
            {showLesson.length} words
          </span>
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {showLesson.map((show, index) => (
          <VocabularyCard key={show.id || show._id || index} show={show} />
        ))}
      </div>
    </div>
  );
};

export default ShowLesson;