import { FiVolume2 } from "react-icons/fi";


const VocabularyInfo = ({ open, setOpen, info,handelSpeech }) => {
  if (!open || !info) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-lg">
        <button
          onClick={() => setOpen(false)}
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-primary mb-1">
          {info.word}
        </h2>

        <p className="text-xl text-gray-500 mb-4">
          {info.pronunciation} • {info.partsOfSpeech}
        </p>

        <div className="mb-3 text-xl">
          <p className="font-semibold">Meaning</p>
          <p>{info.meaning}</p>
        </div>

        <div className="mb-3">
          <p className="font-semibold">Example</p>
          <p className="text-2xl">“{info.sentence}”</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold py-3 text-primary text-xl">Synonyms</p>
          <div className="flex gap-2 flex-wrap">
            {info.synonyms?.map((syn, i) => (
              <button onClick={()=>handelSpeech(syn)} key={i} className="badge badge-outline text-xl py-2 cursor-pointer">
                {syn}   <FiVolume2 size={20} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 border-t pt-3">
          <span>Level: {info.level}</span>
          <span>Points: {info.points}</span>
        </div>
      </div>
    </dialog>
  );
};

export default VocabularyInfo;
