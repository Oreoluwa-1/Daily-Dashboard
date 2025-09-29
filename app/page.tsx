"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Greeting from "./components/Greeting";
import Quote from "./components/Quote";
import Weather from "./components/Weather";

export default function HomePage() {
  const [nameInput, setNameInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const [userCity, setUserCity] = useState<string | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem("daily_dashboard_name");
    const savedCity = localStorage.getItem("daily_dashboard_city");
    if (savedName) setUserName(savedName);
    if (savedCity) setUserCity(savedCity);
  }, []);

  const start = () => {
    const nameTrimmed = nameInput.trim();
    const cityTrimmed = cityInput.trim();
    if (!nameTrimmed || !cityTrimmed) return;

    localStorage.setItem("daily_dashboard_name", nameTrimmed);
    localStorage.setItem("daily_dashboard_city", cityTrimmed);
    setUserName(nameTrimmed);
    setUserCity(cityTrimmed);
    setNameInput("");
    setCityInput("");
  };

  const clearName = () => {
    localStorage.removeItem("daily_dashboard_name");
    localStorage.removeItem("daily_dashboard_city");
    setUserName(null);
    setUserCity(null);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen 
                 bg-gradient-to-br from-teal-400 via-sky-500 to-indigo-600
                 text-white p-6 overflow-hidden"
    >
      {/* 🌊 Animated Blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-teal-400/30 blur-3xl"
        animate={{ x: [0, 60, -60, 0], y: [0, -40, 40, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[35rem] h-[35rem] rounded-full bg-indigo-400/30 blur-3xl"
        animate={{ x: [0, -50, 50, 0], y: [0, 40, -40, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      {!userName ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 bg-white/20 p-8 rounded-2xl shadow-xl text-center 
                     backdrop-blur-md border border-white/30 transition hover:shadow-2xl"
        >
          <h1 className="text-3xl font-extrabold mb-4 tracking-wide drop-shadow">
            🌟 Welcome! What’s your name & city?
          </h1>

          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && start()}
            type="text"
            placeholder="Enter your name"
            className="p-3 rounded-lg text-black w-64 mb-4 focus:outline-none 
                       focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />

          <input
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && start()}
            type="text"
            placeholder="Enter your city"
            className="p-3 rounded-lg text-black w-64 mb-4 focus:outline-none 
                       focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />

          <div className="space-x-3">
            <button
              onClick={start}
              className="px-4 py-2 bg-gradient-to-r from-teal-400 to-sky-500
                         rounded-lg font-bold text-white shadow-md
                         hover:from-teal-500 hover:to-sky-600 transition"
            >
              Start
            </button>

            <button
              onClick={() => {
                setNameInput("Demo");
                setCityInput("Tokyo");
                start();
              }}
              className="px-4 py-2 bg-white/30 border border-white/40
                         text-white rounded-lg hover:bg-white/40 transition"
            >
              Try Demo
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-xl space-y-6"
        >
          <Greeting name={userName} />
          <button
            onClick={clearName}
            className="text-sm text-white/80 underline hover:text-white"
          >
            Change name & city
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/20 p-6 rounded-2xl backdrop-blur-md border border-white/30 shadow-md"
          >
            <Quote />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/20 p-6 rounded-2xl backdrop-blur-md border border-white/30 shadow-md"
          >
            <Weather defaultCity={userCity || ""} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
