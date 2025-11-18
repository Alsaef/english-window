import React from "react";
import { FiInfo } from "react-icons/fi";
import { FiVolume2 } from "react-icons/fi";

const VocabularyCard = ({ show }) => {

  const handelspeechSynthesis=(text)=>{
    let utterance = new SpeechSynthesisUtterance(text);
speechSynthesis.speak(utterance);
  }
  return (
    <div className=" bg-gray-100 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-2">{show.word}</h2>
      <p className="text-gray-700 mb-4 text-center">
        Meaning / Pronunciation
      </p>
      <p className="text-lg mb-6 text-center font-semibold">{show.meaning}</p>

      <div className="w-full flex justify-between">
        <button className="bg-white p-3 rounded-lg shadow hover:bg-gray-200 transition">
          <FiInfo size={20} />
        </button>
        <button onClick={()=>handelspeechSynthesis(show.word)} className="bg-white p-3 rounded-lg shadow hover:bg-gray-200 transition">
          <FiVolume2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default VocabularyCard;
