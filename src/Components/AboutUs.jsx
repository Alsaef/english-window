import React from "react";
import about from '../assets/aboutus.jpg';
export default function AboutUs() {
  return (
  <div>
      <div className="w-full flex justify-center mb-8\">
      <img src={about} alt="About Us" className="w-full max-w-3xl rounded-xl shadow-md" />
    </div>
    <div className="w-full min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">About Us</h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-blue-500">English Window</span> — your friendly
          companion for learning English vocabulary in a simple and enjoyable way. Our mission is to
          help students learn English words with correct pronunciation and meaning in Bengali.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          We provide organized lessons, easy navigation, and audio pronunciation so learners of all
          levels can improve their vocabulary step by step. Whether you are a beginner or want to
          strengthen your basics, English Window is designed to support your learning journey.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600">Our Goals</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2 text-lg">
          <li>Help students learn English vocabulary effortlessly.</li>
          <li>Provide pronunciation audio for proper learning.</li>
          <li>Offer lesson-based categorized vocabulary.</li>
          <li>Make English learning fun, modern, and accessible.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600">Why Choose English Window?</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          ✔ Simple interface, student-friendly design <br />
          ✔ Bengali meaning with clear pronunciation <br />
          ✔ Well-structured lessons and vocabulary cards <br />
          ✔ 100% free to use
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mt-6">
          We believe that learning English should be easy and enjoyable. Stay with us and continue your
          journey of mastering English vocabulary!
        </p>
      </div>
    </div>
  </div>
  );
}
