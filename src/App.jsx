import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Jane Austen"],
    answer: "Harper Lee",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "NaCl"],
    answer: "H2O",
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    answer: "Nile",
  },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [status, setStatus] = useState(null);
  const [questionTimer, setQuestionTimer] = useState(15);
  const [overallTimer, setOverallTimer] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Overall Timer
  useEffect(() => {
    const overallInterval = setInterval(() => setOverallTimer(prev => prev + 1), 1000);
    return () => clearInterval(overallInterval);
  }, []);

  // Question Timer
  useEffect(() => {
    if (questionTimer === 0) {
      setStatus("Unattempted");
      setShowPopup(true);
      return;
    }
    const interval = setInterval(() => setQuestionTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [questionTimer]);

  const handleAnswer = (option) => {
    if (questionTimer > 0) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    setStatus(selectedAnswer ? (selectedAnswer === questions[currentQuestion].answer ? "Correct" : "Incorrect") : "Unattempted");
    setShowPopup(true);
  };

  const handleNext = () => {
    setShowPopup(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setStatus(null);
      setQuestionTimer(15);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-900 text-white p-6 relative">
      {/* Overall Timer */}
      <div className="absolute top-6 right-6 text-xl font-semibold bg-gray-700 px-4 py-2 rounded-md">
        ⏱ Overall Time: {overallTimer}s
      </div>

      {/* Quiz Container */}
      <div className="w-full h-full flex flex-col justify-center items-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-10"
        >
          Quiz App
        </motion.h1>

        <div className="w-full max-w-5xl h-auto p-10 bg-gray-800 shadow-2xl rounded-xl flex flex-col items-center">
          <motion.h2
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold text-center mb-6"
          >
            {questions[currentQuestion].question}
          </motion.h2>

          {/* Timer Animation */}
          <div className="relative text-center text-2xl text-yellow-400 font-bold mb-4">
          ⏳ {questionTimer}s
          <div className="relative inline-block ml-2">
            <motion.div 
              animate={{ scale: [1, 1.3, 1] }} 
              transition={{ repeat: Infinity, duration: 1 }}
            >
              ⚡
            </motion.div>
          </div>
        </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-6 w-full">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`py-4 px-6 rounded-xl text-2xl font-semibold transition-all duration-300 w-full ${
                  selectedAnswer === option ? "bg-blue-500 text-white" : "bg-gray-700 hover:bg-blue-400"
                } ${questionTimer === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
                disabled={questionTimer === 0}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Submit or Next Button */}
          <div className="mt-8">
            {questionTimer === 0 || status ? (
              <button className="bg-green-500 text-white py-4 px-8 rounded-xl text-2xl font-bold" onClick={handleNext}>
                {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
              </button>
            ) : (
              <button className="bg-blue-500 text-white py-4 px-8 rounded-xl text-2xl font-bold" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Status Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70">
          <div className="bg-gray-800 p-8 rounded-2xl text-center shadow-2xl w-96">
            <h2 className="text-3xl font-bold">Status</h2>
            <p className={`mt-4 text-2xl font-semibold ${status === "Correct" ? "text-green-400" : "text-red-400"}`}>
              {status}
            </p>
            <p className="mt-2 text-xl">Correct Answer: {questions[currentQuestion].answer}</p>
            <button className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-xl text-xl font-bold" onClick={handleNext}>
              {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

