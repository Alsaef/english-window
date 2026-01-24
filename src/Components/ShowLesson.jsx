import React, { useContext, useEffect } from 'react';
import { lessonContext } from '../Context/LessonProvider';
import { AiOutlineWarning } from "react-icons/ai"
import VocabularyCard from './VocabularyCard';
import Loading from './Loading';
import LessonNotFound from './LessonNotFound';
const ShowLesson = ({showLessonApi}) => {
    const { selectLesson, loading, fetchShowlesson, showLesson ,setshowLesson,setselectLesson} = useContext(lessonContext);

    
    
      useEffect(()=>{
           if(selectLesson) {
            fetchShowlesson(`${showLessonApi}${selectLesson}`);
        }
   
        },[selectLesson])

    if (loading) {
        return (
           <Loading></Loading>
        );
    }


    if (!selectLesson) {
        return (
           <LessonNotFound></LessonNotFound>
        );
    }


    if (!showLesson || showLesson.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-300">
                <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full shadow">
                    <AiOutlineWarning className="text-gray-500" size={45} />
                </div>
                <p className="mt-4 text-gray-600 text-lg">
                    No vocabulary has been added to this lesson yet.
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-800">
                    Go to the next lesson
                </h2>
            </div>

        );
    }

    return(
        <div className='bg-gray-200 py-10 px-7'>

           <div className='grid lg:grid-cols-3 grid-col-1 gap-3' >
            {
                showLesson.map(show=>(
                    <VocabularyCard show={show}></VocabularyCard>
                ))
            }
           </div>


        </div>

    )
};

export default ShowLesson;