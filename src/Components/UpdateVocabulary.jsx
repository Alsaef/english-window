import React, { useContext, useEffect } from 'react';
import LessonToggle from './LessonToggle';
import ShowLesson from './ShowLesson';
import useResetLesson from '../Hook/useResetLesson';


const UpdateVocabulary = () => {
    let toggleApi = 'https://english-window-server.vercel.app/levels';
    let showLessonApi = `https://english-window-server.vercel.app/vocabulary/`
    useResetLesson()
    return (
        <div>



            <h2 className='lg:text-4xl text-2xl text-center font-bold pt-24'><span className='text-sky-400 '>Let's </span>Update Your Vocabulary
            </h2>

            <LessonToggle toggleApi={toggleApi}></LessonToggle>
            <ShowLesson showLessonApi={showLessonApi}></ShowLesson>
        </div>
    );
};

export default UpdateVocabulary;