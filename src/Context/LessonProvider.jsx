import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
export const lessonContext=createContext(null)
const LessonProvider = ({children}) => {
    const [toggleBtn,setToggleBtn]=useState([])
    const [showLesson,setshowLesson]=useState([])
      const [selectLesson,setselectLesson]=useState('')
    const [loading,setLoading]=useState(false)

   const fetchToggleFn=async(apiUrl)=> {
      try {
          const res=await axios.get(`${apiUrl}`)

          setToggleBtn(res.data.data)
      } catch (error) {
        console.log(error.message);
      }
    }
 

    const fetchShowlesson=async(apiUrl)=>{
        setLoading(true)
        try {
           const res=await axios(`${apiUrl}`) 

           setshowLesson(res?.data?.data)
           setLoading(false)
           console.log(res.data.data);
        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }
    }

  

    return (
       <lessonContext.Provider  value={{ toggleBtn, showLesson, loading, fetchShowlesson, selectLesson, setselectLesson, setshowLesson, fetchToggleFn}}>
        {children}
       </lessonContext.Provider>
    );
};

export default LessonProvider;