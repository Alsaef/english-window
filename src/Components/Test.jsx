import React, { useState } from "react";

const level1Words = [
  { id: 5, word: "Eager", meaning: "আগ্রহী" },
  { id: 19, word: "Sincere", meaning: "সত্‍ / আন্তরিক" },
  { id: 71, word: "Apple", meaning: "আপেল" },
  { id: 72, word: "Big", meaning: "বড়" },
  { id: 73, word: "Cat", meaning: "বিড়াল" },
  { id: 74, word: "Dog", meaning: "কুকুর" },
  { id: 75, word: "Eat", meaning: "খাওয়া" },
  { id: 76, word: "Fast", meaning: "দ্রুত" },
  { id: 77, word: "Go", meaning: "যাওয়া" },
  { id: 78, word: "Hot", meaning: "গরম" },
];

const level2Words = [
  { id: 3, word: "Cautious", meaning: "সতর্ক" },
  { id: 8, word: "Hesitate", meaning: "দ্বিধা করা" },
  { id: 12, word: "Linger", meaning: "থেমে থাকা / বিলম্ব করা" },
  { id: 14, word: "Nourish", meaning: "পুষ্টি যোগানো" },
  { id: 18, word: "Reluctant", meaning: "অনিচ্ছুক" },
  { id: 22, word: "Vague", meaning: "অস্পষ্ট" },
  { id: 26, word: "Adore", meaning: "ভালবাসা" },
];


function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Test() {
  const [level, setLevel] = useState(1);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const words = level === 1 ? level1Words : level2Words;

  const question = words[current];


  const otherOptions = shuffle(words.filter(w => w.id !== question.id)).slice(0, 3);
  const options = shuffle([question.meaning, ...otherOptions.map(o => o.meaning)]);

  const handleAnswer = (answer) => {
    if (answer === question.meaning) {
      setScore(score + 1);
    }

    if (current + 1 < words.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="px-6 py-10">
      <h1 className="text-center text-3xl font-bold text-blue-600 mb-6">
        MCQ Test / Exam
      </h1>

      
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => { setLevel(1); restart(); }}
          className={`px-5 py-2 rounded-lg border ${
            level === 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600"
          }`}
        >
          Lesson 1 Test
        </button>

        <button
          onClick={() => { setLevel(2); restart(); }}
          className={`px-5 py-2 rounded-lg border ${
            level === 2 ? "bg-blue-600 text-white" : "bg-white text-blue-600"
          }`}
        >
          Lesson 2 Test
        </button>
      </div>

      
      {finished ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Test Completed!
          </h2>

          <p className="text-xl mb-6">
            Score: {score} / {words.length}
          </p>

          <button
            onClick={restart}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Restart Test
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-semibold mb-6">
            What is the meaning of:  
            <span className="text-blue-600"> {question.word} ?</span>
          </h2>

          <div className="space-y-4">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="w-full text-left px-5 py-3 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                {option}
              </button>
            ))}
          </div>

          <p className="text-right mt-6 text-gray-500">
            Question {current + 1} / {words.length}
          </p>
        </div>
      )}
    </div>
  );
}
