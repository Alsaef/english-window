import React, { useContext, useEffect } from 'react';
import { lessonContext } from '../Context/LessonProvider';
import { FaBook } from "react-icons/fa";
import useGetAllVocabulary from '../Hook/useGetAllVocabulary';
import CountUp from 'react-countup';

const LessonToggle = ({toggleApi}) => {
    const { toggleBtn, setselectLesson, selectLesson, fetchToggleFn } = useContext(lessonContext)

    const handelFetchLession = (level) => {
        console.log(level);
        setselectLesson(level)

    }

    useEffect(() => {
        fetchToggleFn(`${toggleApi}`)
    }, [])
    return (
        <div className='mt-24'>
           
            <div className='flex flex-wrap gap-2 justify-center my-14'>
                {
                    toggleBtn.map(btn => (
                        <button onClick={() => handelFetchLession(btn.level_no)} key={btn.id} className={`
                            ${selectLesson === btn.level_no ? 'btn bg-[#422AD5] text-white' : 'btn border-[#422AD5] bg-white border-2 text-[#422AD5] hover:bg-[#422AD5] hover:text-white'}
                            
                            
                            `}><FaBook /> Lesson-{btn.level_no}</button>
                    ))
                }
            </div>
        </div>
    );
};

export default LessonToggle;