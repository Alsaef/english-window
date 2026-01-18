import React, { useState } from "react";
import { FiInfo, FiVolume2 } from "react-icons/fi";
import VocabularyInfo from "./VocabularyInfo";
import axios from "axios";

const VocabularyCard = ({ show }) => {
  const [info, setInfo] = useState(null);
  const [open, setOpen] = useState(false);

  const handelSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.cancel(); // prevents overlapping
    speechSynthesis.speak(utterance);
  };

  const handelInfo = async (id) => {
    try {
      const res = await axios.get(
        `https://openapi.programming-hero.com/api/word/${id}`
      );
      setInfo(res.data.data);
      setOpen(true); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-2">{show.word}</h2>
        <p className="text-gray-700 mb-4 text-center">
          Meaning / Pronunciation
        </p>
        <p className="text-lg mb-6 text-center font-semibold">
          {show.meaning}
        </p>

        <div className="w-full flex justify-between">
          <button
            onClick={() => handelInfo(show.id)}
            className="bg-white p-3 rounded-lg shadow hover:bg-gray-200 transition"
          >
            <FiInfo size={20} />
          </button>

          <button
            onClick={() => handelSpeech(show.word)}
            className="bg-white p-3 rounded-lg shadow hover:bg-gray-200 transition"
          >
            <FiVolume2 size={20} />
          </button>
        </div>
      </div>

      {/* Modal */}
      <VocabularyInfo
        open={open}
        setOpen={setOpen}
        info={info}
        handelSpeech={handelSpeech}
      />
    </>
  );
};

export default VocabularyCard;
