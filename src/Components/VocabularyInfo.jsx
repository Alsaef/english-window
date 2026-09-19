import React from "react";
import { Volume2, X, Quote } from "lucide-react";

const VocabularyInfo = ({ open, setOpen, info, handelSpeech }) => {
  if (!open || !info) return null;

  return (
    <dialog open className="modal modal-open backdrop-blur-sm bg-slate-900/40 z-50">
      <div className="modal-box max-w-lg rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xl bg-white relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="btn btn-sm btn-circle btn-ghost text-slate-400 hover:text-slate-700 hover:bg-slate-100 absolute right-4 top-4"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* HEADER BADGES */}
        <div className="flex items-center gap-2 mb-3">
          <span className="badge badge-primary badge-sm font-semibold">
            {info.partsOfSpeech || "Vocabulary"}
          </span>
          {info.level && (
            <span className="badge badge-ghost badge-sm text-slate-500 font-medium">
              Level {info.level}
            </span>
          )}
        </div>

        {/* WORD TITLE & LISTEN TRIGGER */}
        <div className="flex items-center justify-between gap-4 mb-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {info.word}
          </h2>

          <button
            onClick={() => handelSpeech(info.word)}
            className="btn btn-circle btn-md bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-100 shadow-xs transition-all hover:scale-105"
            title="Listen pronunciation"
          >
            <Volume2 size={20} />
          </button>
        </div>

        {/* PRONUNCIATION SECTION - Soothing, clear, pleasant typography */}
        {info.pronunciation && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 mb-5 shadow-xs">
            <Volume2 size={15} className="text-amber-600 flex-shrink-0" />
            <span className="text-xs font-semibold text-amber-700">উচ্চারণ:</span>
            <span className="text-base font-bold tracking-wide text-slate-900">{info.pronunciation}</span>
          </div>
        )}

        {/* MEANING BLOCK */}
        <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100/80 mb-5">
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
            বাংলা অর্থ (Meaning)
          </span>
          <p className="text-xl font-bold text-slate-800">
            {info.meaning || "অর্থ উপলব্ধ নেই"}
          </p>
        </div>

        {/* EXAMPLE SENTENCE */}
        {info.sentence && (
          <div className="mb-5 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1.5">
              <Quote size={12} className="text-indigo-500" />
              Example Sentence
            </span>
            <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
              "{info.sentence}"
            </p>
          </div>
        )}

        {/* SYNONYMS */}
        {info.synonyms && info.synonyms.length > 0 && (
          <div className="mb-6">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Synonyms
            </span>
            <div className="flex gap-2 flex-wrap">
              {info.synonyms.map((syn, i) => (
                <button
                  onClick={() => handelSpeech(syn)}
                  key={i}
                  className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Click to listen"
                >
                  <span>{syn}</span>
                  <Volume2 size={12} className="opacity-60" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER STATS */}
        <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-100 pt-4">
          <span className="font-medium">Difficulty Level: {info.level || "Standard"}</span>
          {info.points && <span className="font-semibold text-indigo-600">+{info.points} Pts</span>}
        </div>

      </div>
    </dialog>
  );
};

export default VocabularyInfo;
