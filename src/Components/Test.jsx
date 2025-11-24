import React, { useState } from "react";

// Lesson 1 Words
const level1Words = [
  { "id": 5, "level": 1, "word": "Eager", "meaning": "আগ্রহী", "pronunciation": "ইগার" },
  { "id": 19, "level": 1, "word": "Sincere", "meaning": "সত্‍ / আন্তরিক", "pronunciation": "সিনসিয়ার" },
  { "id": 71, "level": 1, "word": "Apple", "meaning": "আপেল", "pronunciation": "অ্যাপল" },
  { "id": 72, "level": 1, "word": "Big", "meaning": "বড়", "pronunciation": "বিগ" },
  { "id": 73, "level": 1, "word": "Cat", "meaning": "বিড়াল", "pronunciation": "ক্যাট" },
  { "id": 74, "level": 1, "word": "Dog", "meaning": "কুকুর", "pronunciation": "ডগ" },
  { "id": 75, "level": 1, "word": "Eat", "meaning": "খাওয়া", "pronunciation": "ইট" },
  { "id": 76, "level": 1, "word": "Fast", "meaning": "দ্রুত", "pronunciation": "ফাস্ট" },
  { "id": 77, "level": 1, "word": "Go", "meaning": "যাওয়া", "pronunciation": "গো" },
  { "id": 78, "level": 1, "word": "Hot", "meaning": "গরম", "pronunciation": "হট" },
  { "id": 79, "level": 1, "word": "Jump", "meaning": "লাফানো", "pronunciation": "জাম্প" },
  { "id": 80, "level": 1, "word": "Run", "meaning": "দৌড়ানো", "pronunciation": "রান" },
  { "id": 81, "level": 1, "word": "Ball", "meaning": "বল", "pronunciation": "বল" },
  { "id": 82, "level": 1, "word": "Car", "meaning": "গাড়ি", "pronunciation": "কার" },
  { "id": 83, "level": 1, "word": "Door", "meaning": "দরজা", "pronunciation": "ডোর" },
  { "id": 84, "level": 1, "word": "Fish", "meaning": "মাছ", "pronunciation": "ফিশ" },
  { "id": 85, "level": 1, "word": "Hat", "meaning": "টুপি", "pronunciation": "হ্যাট" },
  { "id": 86, "level": 1, "word": "Milk", "meaning": "দুধ", "pronunciation": "মিল্ক" },
  { "id": 87, "level": 1, "word": "Sun", "meaning": "সূর্য", "pronunciation": "সান" },
  { "id": 88, "level": 1, "word": "Toy", "meaning": "খেলনা", "pronunciation": "টয়" },
  { "id": 89, "level": 1, "word": "Tree", "meaning": "গাছ", "pronunciation": "ট্রি" },
  { "id": 90, "level": 1, "word": "Water", "meaning": "পানি", "pronunciation": "ওয়াটার" }
];

// Lesson 2 Words
const level2Words = [
  { "id": 3, "level": 2, "word": "Cautious", "meaning": "সতর্ক", "pronunciation": "কশাস" },
  { "id": 8, "level": 2, "word": "Hesitate", "meaning": "দ্বিধা করা", "pronunciation": "হেজিটেট" },
  { "id": 12, "level": 2, "word": "Linger", "meaning": "থেমে থাকা / বিলম্ব করা", "pronunciation": "লিঙ্গার" },
  { "id": 14, "level": 2, "word": "Nourish", "meaning": "পুষ্টি যোগানো", "pronunciation": "নরিশ" },
  { "id": 18, "level": 2, "word": "Reluctant", "meaning": "অনিচ্ছুক", "pronunciation": "রিলাকট্যান্ট" },
  { "id": 22, "level": 2, "word": "Vague", "meaning": "অস্পষ্ট", "pronunciation": "ভেইগ" },
  { "id": 26, "level": 2, "word": "Adore", "meaning": "ভালবাসা / পূজা করা", "pronunciation": "এডোর" },
  { "id": 32, "level": 2, "word": "Gloomy", "meaning": "অন্ধকারাচ্ছন্ন / বিষণ্ণ", "pronunciation": "গ্লুমি" },
  { "id": 36, "level": 2, "word": "Keen", "meaning": "তীক্ষ্ণ / উৎসাহী", "pronunciation": "কীন" },
  { "id": 56, "level": 2, "word": "Frail", "meaning": "দুর্বল / ভঙ্গুর", "pronunciation": "ফ্রেইল" },
  { "id": 91, "level": 2, "word": "Angry", "meaning": "রাগান্বিত", "pronunciation": "এংগ্রি" },
  { "id": 92, "level": 2, "word": "Brave", "meaning": "সাহসী", "pronunciation": "ব্রেভ" },
  { "id": 93, "level": 2, "word": "Cold", "meaning": "ঠাণ্ডা", "pronunciation": "কোল্ড" },
  { "id": 94, "level": 2, "word": "Dance", "meaning": "নৃত্য", "pronunciation": "ডান্স" },
  { "id": 95, "level": 2, "word": "Easy", "meaning": "সহজ", "pronunciation": "ইজি" },
  { "id": 96, "level": 2, "word": "Friend", "meaning": "বন্ধু", "pronunciation": "ফ্রেন্ড" },
  { "id": 97, "level": 2, "word": "Happy", "meaning": "সুখী", "pronunciation": "হ্যাপি" },
  { "id": 98, "level": 2, "word": "Jump", "meaning": "লাফানো", "pronunciation": "জাম্প" },
  { "id": 99, "level": 2, "word": "Kind", "meaning": "দয়ালু", "pronunciation": "কাইন্ড" },
  { "id": 100, "level": 2, "word": "Love", "meaning": "ভালবাসা", "pronunciation": "লভ" },
  { "id": 101, "level": 2, "word": "Market", "meaning": "বাজার", "pronunciation": "মার্কেট" },
  { "id": 102, "level": 2, "word": "Night", "meaning": "রাত্রি", "pronunciation": "নাইট" },
  { "id": 103, "level": 2, "word": "Open", "meaning": "খোলা", "pronunciation": "ওপেন" },
  { "id": 104, "level": 2, "word": "Quiet", "meaning": "নীরব", "pronunciation": "কুয়েট" },
  { "id": 105, "level": 2, "word": "Rain", "meaning": "বৃষ্টি", "pronunciation": "রেইন" },
  { "id": 106, "level": 2, "word": "Sleep", "meaning": "ঘুমানো", "pronunciation": "স্লিপ" },
  { "id": 107, "level": 2, "word": "Talk", "meaning": "কথা বলা", "pronunciation": "টক" },
  { "id": 108, "level": 2, "word": "Train", "meaning": "ট্রেন", "pronunciation": "ট্রেন" },
  { "id": 109, "level": 2, "word": "Walk", "meaning": "হাঁটা", "pronunciation": "ওয়াক" },
  { "id": 110, "level": 2, "word": "Yellow", "meaning": "হলুদ", "pronunciation": "ইয়েলো" }
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
  const otherOptions = shuffle(words.filter(w => w.id !== question.id && w.meaning)).slice(0, 3);
  const options = shuffle([question.meaning, ...otherOptions.map(o => o.meaning)]);

  const handleAnswer = (answer) => {
    if (answer === question.meaning) setScore(score + 1);

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
          className={level === 1 ? "btn bg-[#422AD5] text-white" : "btn border-[#422AD5] bg-white border-2 text-[#422AD5] hover:bg-[#422AD5] hover:text-white"}
        >
          Lesson 1 Test
        </button>

        <button
          onClick={() => { setLevel(2); restart(); }}
          className={level === 2 ? "btn bg-[#422AD5] text-white" : "btn border-[#422AD5] bg-white border-2 text-[#422AD5] hover:bg-[#422AD5] hover:text-white"}
        >
          Lesson 2 Test
        </button>
      </div>

      {finished ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Test Completed!</h2>
          <p className="text-xl mb-6">Score: {score} / {words.length}</p>
          <button onClick={restart} className="px-6 py-2 bg-[#422AD5] text-white rounded-lg">
            Restart Test
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-semibold mb-6">
            What is the meaning of: <span className="text-blue-600">{question.word}?</span>
          </h2>

          <div className="space-y-4">
            {options.map((option, index) => (
              <button
                key={index}
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
