import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useGetAllVocabulary = () => {
    const [totalV,setTotalV]=useState([])
    useEffect(()=>{
        axios.get('https://openapi.programming-hero.com/api/words/all')
        .then(res=>{setTotalV(res.data.data)})
    },[])

    return [totalV]
};

export default useGetAllVocabulary;