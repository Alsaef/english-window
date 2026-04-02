import { useEffect, useState } from "react";
import { FiVolume2 } from "react-icons/fi";

const types = ["All", "Noun", "Verb", "Adjective"];

// 🔊 Speak Function
const speakWord = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
};

const VocabularyCard = ({ item }) => {
  return (
    <div className="border border-blue-500 rounded-2xl p-5 shadow hover:shadow-lg transition bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-500">{item.word}</h2>
        <button
          onClick={() => speakWord(item.word)}
          className="text-xl"
        >
           <FiVolume2 size={20} />
        </button>
      </div>

      <p className="text-sm text-gray-400">{item.type}</p>

      <p className="mt-2">{item.pronunciation}</p>
      <p className="mt-1 font-semibold">🇧🇩 {item.bangla_meaning}</p>

      <div className="mt-3">
        <p className="text-sm text-gray-500">Synonyms:</p>
        <div className="flex gap-2 flex-wrap mt-1">
          {item.synonyms.map((syn, i) => (
            <span
            onClick={() => speakWord(syn)}
              key={i}
              className="border cursor-pointer flex items-center gap-2 border-blue-400 px-2 py-1 rounded text-sm"
            >
               <FiVolume2 size={15} /> {syn}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function VocabularyPage() {
  const [activeType, setActiveType] = useState("All");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://english-window-server.vercel.app/list")
      .then((res) => res.json())
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredData =
    activeType === "All"
      ? data
      : data.filter((item) => item.type === activeType);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
        Listening Page
      </h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center flex-wrap gap-3 mb-8">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-2 rounded-full border transition ${
              activeType === type
                ? "bg-blue-500 text-white border-blue-500"
                : "border-blue-400 text-blue-500"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">Loading...</p>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {!loading &&
          filteredData.map((item) => (
            <VocabularyCard key={item._id} item={item} />
          ))}
      </div>

      {!loading && filteredData.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No words found 😢
        </p>
      )}
    </div>
  );
}

