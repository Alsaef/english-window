import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
export const lessonContext=createContext(null)
const LessonProvider = ({children}) => {
    const [toggleBtn,setToggleBtn]=useState([])
    const [showLesson,setshowLesson]=useState([])
      const [selectLesson,setselectLesson]=useState('')
    const [loading,setLoading]=useState(false)

   const fetchToggleFn=async()=> {
      try {
          const res=await axios.get('https://openapi.programming-hero.com/api/levels/all')

          setToggleBtn(res.data.data)
      } catch (error) {
        console.log(error.message);
      }
    }
    useEffect(()=>{
     fetchToggleFn()
    },[])

    const fetchShowlesson=async()=>{
        setLoading(true)
        try {
           const res=await axios(`https://openapi.programming-hero.com/api/level/${selectLesson}`) 

           setshowLesson(res?.data?.data)
           setLoading(false)
           console.log(res.data.data);
        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }
    }

    useEffect(()=>{
       if(selectLesson) {
        fetchShowlesson();
    }
    },[selectLesson])

    return (
       <lessonContext.Provider  value={{ toggleBtn, showLesson, loading, fetchShowlesson, selectLesson, setselectLesson}}>
        {children}
       </lessonContext.Provider>
    );
};

export default LessonProvider;