import React from 'react';

const LessonNotFound = () => {
    return (
        <div>
             <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-200">
                <p className="mt-4 text-gray-600 text-lg">
                    No lesson selected.
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-800">
                    Please select a lesson
                </h2>
            </div>
        </div>
    );
};

export default LessonNotFound;