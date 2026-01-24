import React, { useContext, useEffect } from 'react';
import LessonToggle from './LessonToggle';
import ShowLesson from './ShowLesson';
import useGetAllVocabulary from '../Hook/useGetAllVocabulary';
import CountUp from 'react-countup';
import useResetLesson from '../Hook/useResetLesson';



const Home = () => {
    let toggleApi = 'https://openapi.programming-hero.com/api/levels/all';
    let showLessonApi = `https://openapi.programming-hero.com/api/level/`;
    const [totalV] = useGetAllVocabulary()
useResetLesson()
   
    return (
        <div>
            <h2 className='lg:text-4xl text-2xl text-center font-bold pt-24'><span className='text-sky-400 '>Let's </span>Learn Vocabularies <CountUp duration={3.75} end={totalV?.length} />
            </h2>
            <LessonToggle toggleApi={toggleApi}></LessonToggle>
            <ShowLesson showLessonApi={showLessonApi}></ShowLesson>
        </div>
    );
};

export default Home;