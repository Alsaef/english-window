import React, { useContext } from 'react';
import { lessonContext } from '../Context/LessonProvider';
import { FaBook } from "react-icons/fa";
import useGetAllVocabulary from '../Hook/useGetAllVocabulary';
import CountUp from 'react-countup';

const LessonToggle = () => {
    const {toggleBtn,setselectLesson,selectLesson}=useContext(lessonContext)
     const [totalV]=useGetAllVocabulary()

    const handelFetchLession=(level)=>{
        console.log(level);
        setselectLesson(level)
      
    }
    return (
        <div className='mt-24'>
            <h2 className='lg:text-4xl text-2xl text-center font-bold'><span className='text-sky-400 '>Let's </span>Learn Vocabularies <CountUp  duration={3.75} end={totalV?.length} />
 </h2>
            <div className='flex flex-wrap gap-2 justify-center my-14'>
                {
                    toggleBtn.map(btn=>(
                        <button onClick={()=>handelFetchLession(btn.level_no)} key={btn.id} className={`
                            ${selectLesson===btn.level_no? 'btn bg-[#422AD5] text-white':'btn border-[#422AD5] bg-white border-2 text-[#422AD5] hover:bg-[#422AD5] hover:text-white'}
                            
                            
                            `}><FaBook/> Lesson-{btn.level_no}</button>
                    ))
                }
            </div>
        </div>
    );
};

export default LessonToggle;