import React, { useState } from "react";

const level1Words = [
   {
      "id": 4,
      "level": 5,
      "word": "Diligent",
      "meaning": "পরিশ্রমী",
      "pronunciation": "ডিলিজেন্ট"
    },
    {
      "id": 6,
      "level": 5,
      "word": "Fascinate",
      "meaning": "মুগ্ধ করা",
      "pronunciation": "ফ্যাসিনেট"
    },
    {
      "id": 9,
      "level": 5,
      "word": "Illuminate",
      "meaning": "আলোকিত করা",
      "pronunciation": "ইলুমিনেট"
    },
    {
      "id": 15,
      "level": 5,
      "word": "Obstinate",
      "meaning": "একগুঁয়ে",
      "pronunciation": "অবস্টিনেট"
    },
    {
      "id": 16,
      "level": 5,
      "word": "Placid",
      "meaning": "শান্ত",
      "pronunciation": "প্ল্যাসিড"
    },
    {
      "id": 23,
      "level": 5,
      "word": "Wholesome",
      "meaning": "পুষ্টিকর / স্বাস্থ্যকর",
      "pronunciation": "হোউলসাম"
    },
    {
      "id": 25,
      "level": 5,
      "word": "Zealous",
      "meaning": "উত্সাহী",
      "pronunciation": "জেলাস"
    },
    {
      "id": 29,
      "level": 5,
      "word": "Dwindle",
      "meaning": "হ্রাস পাওয়া",
      "pronunciation": "ডউইন্ডল"
    },
    {
      "id": 34,
      "level": 5,
      "word": "Illuminate",
      "meaning": null,
      "pronunciation": "ইলুমিনেট"
    },
    {
      "id": 40,
      "level": 5,
      "word": "Obscure",
      "meaning": "অস্পষ্ট / অজানা",
      "pronunciation": "অবস্কিউর"
    },
    {
      "id": 43,
      "level": 5,
      "word": "Radiant",
      "meaning": "উজ্জ্বল / দীপ্তিময়",
      "pronunciation": "রেডিয়ান্ট"
    },
    {
      "id": 46,
      "level": 5,
      "word": "Unravel",
      "meaning": "উন্মোচন করা / খোলাসা করা",
      "pronunciation": "আনর‍্যাভেল"
    },
    {
      "id": 47,
      "level": 5,
      "word": "Venture",
      "meaning": "ঝুঁকিপূর্ণ কাজ / সাহসী প্রচেষ্টা",
      "pronunciation": "ভেনচার"
    },
    {
      "id": 50,
      "level": 5,
      "word": "Zephyr",
      "meaning": "মৃদু বাতাস / হালকা হাওয়া",
      "pronunciation": "জেফার"
    },
    {
      "id": 51,
      "level": 5,
      "word": "Adorn",
      "meaning": "সাজানো / অলংকৃত করা",
      "pronunciation": "অ্যাডর্ন"
    },
    {
      "id": 55,
      "level": 5,
      "word": "Eloquent",
      "meaning": "বাকপটু / চমৎকার বক্তৃতা দিতে সক্ষম",
      "pronunciation": "এলোকোয়েন্ট"
    },
    {
      "id": 58,
      "level": 5,
      "word": "Hinder",
      "meaning": "বাধা দেওয়া / বিলম্ব ঘটানো",
      "pronunciation": "হিন্দার"
    },
    {
      "id": 62,
      "level": 5,
      "word": "Linger",
      "meaning": "অবশিষ্ট থাকা / বিলম্ব করা",
      "pronunciation": "লিঙ্গার"
    },
    {
      "id": 64,
      "level": 5,
      "word": "Notorious",
      "meaning": "কুখ্যাত / বদনামি",
      "pronunciation": "নোটোরিয়াস"
    },
    {
      "id": 66,
      "level": 5,
      "word": "Pristine",
      "meaning": "অকৃত্রিম / সম্পূর্ণ বিশুদ্ধ",
      "pronunciation": "প্রিস্টিন"
    },
    {
      "id": 148,
      "level": 5,
      "word": "Supercilious",
      "meaning": "অহঙ্কারী",
      "pronunciation": "সুপারসিলিয়াস"
    },
    {
      "id": 149,
      "level": 5,
      "word": "Tranquil",
      "meaning": "শান্ত",
      "pronunciation": "ট্রাঙ্কুইল"
    },
    {
      "id": 150,
      "level": 5,
      "word": "Vindicate",
      "meaning": "পাল্টানো",
      "pronunciation": "ভিন্ডিকেট"
    }
];

const level2Words = [
  {
      "id": 68,
      "level": 5,
      "word": "Reckless",
      "meaning": "উন্মত্ত / অবিবেচক",
      "pronunciation": "রেকলেস"
    },
    {
      "id": 111,
      "level": 5,
      "word": "Accomplish",
      "meaning": "সম্পন্ন করা",
      "pronunciation": "অ্যাকমপ্লিশ"
    },
    {
      "id": 113,
      "level": 5,
      "word": "Cautious",
      "meaning": "সতর্ক",
      "pronunciation": "কাউশাস"
    },
    {
      "id": 115,
      "level": 5,
      "word": "Eloquent",
      "meaning": "প্রभावশালী",
      "pronunciation": "এলোকুয়েন্ট"
    },
    {
      "id": 117,
      "level": 5,
      "word": "Hesitate",
      "meaning": "দ্বিধা করা",
      "pronunciation": "হেসিটেট"
    },
    {
      "id": 119,
      "level": 5,
      "word": "Judicious",
      "meaning": "বিচক্ষণ",
      "pronunciation": "জুডিশিয়াস"
    },
    {
      "id": 121,
      "level": 5,
      "word": "Luminous",
      "meaning": "উজ্জ্বল",
      "pronunciation": "লুমিনাস"
    },
    {
      "id": 123,
      "level": 5,
      "word": "Nurture",
      "meaning": "পালন করা",
      "pronunciation": "নার্চার"
    },
    {
      "id": 125,
      "level": 5,
      "word": "Perplexed",
      "meaning": "ভ্ব্রান্ত",
      "pronunciation": "পারপ্লেক্সড"
    },
    {
      "id": 127,
      "level": 5,
      "word": "Resilient",
      "meaning": "অবিচলিত",
      "pronunciation": "রেজিলিয়েন্ট"
    },
    {
      "id": 129,
      "level": 5,
      "word": "Thwart",
      "meaning": "বাধা সৃষ্টি করা",
      "pronunciation": "থওর্ত"
    },
    {
      "id": 131,
      "level": 5,
      "word": "Absurd",
      "meaning": "অকেশনীয়",
      "pronunciation": "অ্যাবসার্ড"
    },
    {
      "id": 132,
      "level": 5,
      "word": "Benevolence",
      "meaning": "দয়া",
      "pronunciation": "বিনেভোলেন্স"
    },
    {
      "id": 133,
      "level": 5,
      "word": "Camaraderie",
      "meaning": null,
      "pronunciation": "ক্যামারাডারি"
    },
    {
      "id": 134,
      "level": 5,
      "word": "Dissonance",
      "meaning": "অসঙ্গতি",
      "pronunciation": "ডিসোন্যান্স"
    },
    {
      "id": 135,
      "level": 5,
      "word": "Euphoria",
      "meaning": "আনন্দের অনুভূতি",
      "pronunciation": "ইউফোরিয়া"
    },
    {
      "id": 136,
      "level": 5,
      "word": "Finesse",
      "meaning": "দক্ষতা",
      "pronunciation": "ফিনেস"
    },
    {
      "id": 137,
      "level": 5,
      "word": "Grievance",
      "meaning": "অভিযোগ",
      "pronunciation": "গ্রিভেন্স"
    },
    {
      "id": 138,
      "level": 5,
      "word": "Impeccable",
      "meaning": "অকৃতদোষ",
      "pronunciation": "ইমপেকেবল"
    },
    {
      "id": 139,
      "level": 5,
      "word": "Juxtapose",
      "meaning": "অংশবিশেষ তুলনা করা",
      "pronunciation": "জাক্সটাপোজ"
    },
    {
      "id": 140,
      "level": 5,
      "word": "Kaleidoscope",
      "meaning": "রঙিন কাচের গ্লাস",
      "pronunciation": "ক্যালাইডোস্কোপ"
    },
    {
      "id": 141,
      "level": 5,
      "word": "Lethargic",
      "meaning": "অসুস্থ বা নিষ্ক্রিয়",
      "pronunciation": "লিথারজিক"
    },
    {
      "id": 142,
      "level": 5,
      "word": "Mitigate",
      "meaning": "কমানো",
      "pronunciation": "মিটিগেট"
    },
    {
      "id": 143,
      "level": 5,
      "word": "Nebulous",
      "meaning": "অস্পষ্ট",
      "pronunciation": "নেবিউলাস"
    },
    {
      "id": 144,
      "level": 5,
      "word": "Ostentatious",
      "meaning": "প্রদর্শনমূলক",
      "pronunciation": "অস্টেন্টেশন"
    },
    {
      "id": 145,
      "level": 5,
      "word": "Pragmatic",
      "meaning": "ব্যবহারিক",
      "pronunciation": "প্রাগম্যাটিক"
    },
    {
      "id": 146,
      "level": 5,
      "word": "Quixotic",
      "meaning": "অসম্ভব ও আবেগপ্রবণ",
      "pronunciation": "কুইক্সটিক"
    },
    {
      "id": 147,
      "level": 5,
      "word": "Recalcitrant",
      "meaning": "অধিকারী নয় এমন",
      "pronunciation": "রিক্যালসিট্রান্ট"
    }
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
