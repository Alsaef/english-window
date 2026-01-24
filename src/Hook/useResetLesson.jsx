import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { lessonContext } from '../Context/LessonProvider';

const useResetLesson = () => {
    const { setshowLesson, setselectLesson } = useContext(lessonContext);
    const path = useLocation();

    useEffect(() => {
        setselectLesson('');
        setshowLesson([]);
        // This will run whenever the URL changes
    }, [path.pathname, setselectLesson, setshowLesson]);
};

export default useResetLesson;