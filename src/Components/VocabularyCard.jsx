import React, { useState } from "react";
import { Volume2, Info } from "lucide-react";
import VocabularyInfo from "./VocabularyInfo";
import axios from "axios";
import { useLocation } from "react-router-dom";

const VocabularyCard = ({ show }) => {
  const [info, setInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const path = useLocation();

  const handleSpeech = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleInfo = async (id) => {
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

  const handleInfoOwn = async (id) => {
    try {
      const res = await axios.get(
        `https://english-window-server.vercel.app/vocabularydetails/${id}`
      );
      setInfo(res.data.data);
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="group relative bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        {/* Subtle accent bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          {/* CARD TOP HEADER */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
              Vocabulary
            </span>
            {show.pronunciation && (
              <span className="text-xs text-slate-400 italic">
                /{show.pronunciation}/
              </span>
            )}
          </div>

          {/* MAIN WORD */}
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight text-center py-2">
            {show.word}
          </h3>

          {/* MEANING */}
          <div className="my-4 p-3 bg-slate-50 rounded-2xl text-center border border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">
              Bengali Meaning
            </span>
            <p className="text-lg font-bold text-slate-800">
              {show.meaning}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
          {/* DETAILS BUTTON */}
          <button
            onClick={() =>
              path.pathname === "/"
                ? handleInfo(show.id)
                : handleInfoOwn(show._id)
            }
            className="btn btn-sm btn-ghost rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 gap-1.5 transition-all"
            title="View Details"
          >
            <Info size={16} />
            <span className="text-xs font-bold">Details</span>
          </button>

          {/* PRONUNCIATION BUTTON */}
          <button
            onClick={() => handleSpeech(show.word)}
            className="btn btn-sm btn-circle bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white border-none shadow-xs transition-all hover:scale-110"
            title="Listen Pronunciation"
            aria-label="Pronounce"
          >
            <Volume2 size={16} />
          </button>
        </div>
      </div>

      {/* MODAL */}
      <VocabularyInfo
        open={open}
        setOpen={setOpen}
        info={info}
        handelSpeech={handleSpeech}
      />
    </>
  );
};

export default VocabularyCard;
