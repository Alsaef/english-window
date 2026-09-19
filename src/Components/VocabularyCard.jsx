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
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100/60">
              Vocabulary
            </span>

            {/* Quick pronunciation sound trigger */}
            <button
              onClick={() => handleSpeech(show.word)}
              className="btn btn-xs btn-circle bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white border-none shadow-xs transition-all hover:scale-110"
              title="Listen Pronunciation"
              aria-label="Listen audio"
            >
              <Volume2 size={13} />
            </button>
          </div>

          {/* MAIN WORD */}
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight text-center pt-1 pb-2">
            {show.word}
          </h3>

          {/* PRONUNCIATION SECTION - Clean, eye-friendly, comfortable */}
          {show.pronunciation ? (
            <div className="flex items-center justify-center my-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50/90 border border-amber-200/70 text-amber-900 text-sm font-semibold shadow-xs">
                <Volume2 size={13} className="text-amber-600 flex-shrink-0" />
                <span className="text-xs text-amber-700/80 font-medium">উচ্চারণ:</span>
                <span className="tracking-wide text-slate-900 font-bold">{show.pronunciation}</span>
              </div>
            </div>
          ) : (
            <div className="h-6 mb-2" />
          )}

          {/* MEANING */}
          <div className="my-3 p-3.5 bg-slate-50/80 rounded-2xl text-center border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              বাংলা অর্থ
            </span>
            <p className="text-lg font-bold text-slate-800">
              {show.meaning || (show.pronunciation ? `উচ্চারণ: ${show.pronunciation}` : "অর্থ জানতে Details দেখুন")}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 mt-2">
          {/* DETAILS BUTTON */}
          <button
            onClick={() =>
              path.pathname === "/"
                ? handleInfo(show.id)
                : handleInfoOwn(show._id)
            }
            className="btn btn-sm btn-ghost rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 gap-1.5 transition-all text-xs font-bold"
            title="View Details"
          >
            <Info size={15} />
            <span>Details</span>
          </button>

          {/* PRONUNCIATION LISTEN BUTTON */}
          <button
            onClick={() => handleSpeech(show.word)}
            className="btn btn-sm rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-100/80 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            title="Listen Pronunciation"
          >
            <Volume2 size={14} />
            <span>শুনুন</span>
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
