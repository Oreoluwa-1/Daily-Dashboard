"use client";
import { useEffect, useState } from "react";

export default function Quote() {
  const [quote, setQuote] = useState("Loading quote...");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("/api/quote");
        const data = await res.json();
        setQuote(`${data.text} — ${data.author}`);
      } catch {
        setQuote("Could not load a quote at this time.");
      }
    };

    fetchQuote();
  }, []);

  return <p className="text-xl">💡 {quote}</p>;
}
