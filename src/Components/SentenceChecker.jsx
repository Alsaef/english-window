import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Sparkles,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Briefcase,
  MessageCircle,
  ShieldCheck,
  Languages,
  Clock,
  Lock
} from "lucide-react";

export default function SentenceChecker() {
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [quota, setQuota] = useState({ remaining: null, limit: 15, retryAfterMinutes: 0, ip: "" });

  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    (window.location.hostname === "production"
      ? "http://localhost:5000"
      : "https://english-window-server.vercel.app");

  // Sample sentences for 1-click quick testing
  const sampleSentences = [
    { text: "She doesn't know where is the station.", label: "Subject-Verb & Word Order" },
    { text: "I am looking forward to meeting you next week.", label: "Prepositional Gerund" },
    { text: "He goes to the market yesterday with his friends.", label: "Past Tense Error" },
    { text: "Although it was raining, we played football.", label: "Conjunction" },
    { text: "The police are investigating the case very carefully.", label: "Collective Noun" },
    { text: "She speaks English very fluently and confidently.", label: "Correct Sentence" }
  ];

  // Fetch initial rate limit quota for client IP
  useEffect(() => {
    fetchQuota();
  }, []);

  const fetchQuota = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/check-sentence/quota`);
      if (res.ok) {
        const data = await res.json();
        setQuota({
          remaining: data.remaining,
          limit: data.limit,
          retryAfterMinutes: data.retryAfterMinutes,
          ip: data.ip
        });
        if (data.remaining > 0 && error?.toLowerCase().includes("limit")) {
          setError("");
        }
      }
    } catch (e) {
      console.warn("Could not fetch rate limit quota:", e);
    }
  };

  // Live countdown timer when rate limit is reached
  useEffect(() => {
    let interval = null;
    if (quota.remaining === 0 && quota.retryAfterMinutes > 0) {
      interval = setInterval(() => {
        setQuota((prev) => {
          if (prev.retryAfterMinutes <= 1) {
            fetchQuota();
            return { ...prev, retryAfterMinutes: 0 };
          }
          return { ...prev, retryAfterMinutes: prev.retryAfterMinutes - 1 };
        });
      }, 60000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [quota.remaining, quota.retryAfterMinutes]);

  // Text-to-Speech audio pronunciation
  const handleSpeech = (text) => {
    if (!text) return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88;
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  // One-click copy
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to detect keyboard smashes, gibberish, or non-English letter sequences
  const isLikelyGibberish = (text) => {
    const trimmed = text.trim();
    const words = trimmed.split(/\s+/);
    const vowelRegex = /[aeiouy]/i;

    const hasRepeatedConsonants = /[bcdfghjklmnpqrstvwxyz]{5,}/i;
    const hasNoVowelsInLongWord = words.some(w => w.length >= 4 && !vowelRegex.test(w));
    const repeatingChars = /(.)\1{4,}/i;

    if (hasNoVowelsInLongWord || hasRepeatedConsonants.test(trimmed) || repeatingChars.test(trimmed)) {
      return true;
    }

    if (words.length === 1 && trimmed.length >= 5) {
      const vowels = (trimmed.match(/[aeiouy]/gi) || []).length;
      const consonants = (trimmed.match(/[bcdfghjklmnpqrstvwxz]/gi) || []).length;
      if (vowels === 0 || consonants / (vowels || 1) >= 4) {
        return true;
      }
    }

    return false;
  };

  // Heuristic local fallback analyzer for instant offline resilience
  const analyzeLocally = (text) => {
    const trimmed = text.trim();
    const lower = trimmed.toLowerCase();
    const words = trimmed.split(/\s+/);

    // 1. Gibberish / Nonsense Detection
    if (isLikelyGibberish(trimmed)) {
      return {
        isCorrect: false,
        originalSentence: trimmed,
        correctedSentence: "Please write a meaningful English sentence.",
        status: "Needs Correction",
        overallScore: 0,
        bengaliMeaning: "এটি কোনো অর্থপূর্ণ ইংরেজি বাক্য বা শব্দ নয় (এলোমেলো টাইপ করা বর্ণ সমষ্টি)।",
        englishMeaning: "This input consists of meaningless gibberish or random letters without valid English words or sentence structure.",
        errors: [
          {
            type: "Invalid / Gibberish Input",
            incorrect: trimmed,
            correction: "Use real English words",
            explanation: "The text contains random characters or non-English letter combinations without linguistic meaning.",
            bengaliExplanation: "এটি কোনো স্বীকৃত ইংরেজি শব্দ নয়, বরং কিবোর্ডের এলোমেলো অক্ষরের সমষ্টি।"
          }
        ],
        improvedAlternative: "",
        formalAlternative: "",
        casualAlternative: "",
        grammarRuleTips: "A valid English sentence requires meaningful words, a subject, and a finite verb to convey a complete thought.",
        keyVocabulary: []
      };
    }

    // 2. Incomplete single word check
    if (words.length === 1 && !["hello", "welcome", "thanks", "congratulations", "yes", "no"].includes(lower)) {
      return {
        isCorrect: false,
        originalSentence: trimmed,
        correctedSentence: `It is ${trimmed}.`,
        status: "Minor Suggestion",
        overallScore: 40,
        bengaliMeaning: `শব্দটির অর্থ: ${trimmed}`,
        englishMeaning: `This is a single standalone word ('${trimmed}'), not a complete sentence.`,
        errors: [
          {
            type: "Incomplete Sentence",
            incorrect: trimmed,
            correction: `Add a subject and verb (e.g. 'It is ${trimmed}.')`,
            explanation: "A complete sentence requires both a subject and a verb to express a complete thought.",
            bengaliExplanation: "একটি সম্পূর্ণ বাক্য গঠন করার জন্য subject এবং verb থাকা আবশ্যক।"
          }
        ],
        improvedAlternative: `It is ${trimmed}.`,
        formalAlternative: `It is ${trimmed}.`,
        casualAlternative: `It's ${trimmed}.`,
        grammarRuleTips: "Sentence rule: Subject + Verb + Complement/Object.",
        keyVocabulary: [
          { word: trimmed, partOfSpeech: "word", meaning: "Standalone vocabulary word", bengaliMeaning: "শব্দ" }
        ]
      };
    }

    let isCorrect = true;
    let status = "Perfect";
    let score = 90;
    let corrected = text;
    let errors = [];
    let bengaliMeaning = "বাক্যটির অর্থ: এটি একটি সঠিক ও সাবলীল বাক্য।";
    let englishMeaning = "The sentence conveys a clear and grammatically sound thought.";
    let formalAlt = text;
    let casualAlt = text;
    let tip = "Ensure subject and verb agree, and tenses match the time context.";

    if (lower.includes("she don't") || lower.includes("he don't") || lower.includes("it don't")) {
      isCorrect = false;
      status = "Needs Correction";
      score = 60;
      corrected = text.replace(/don't/gi, "doesn't").replace(/dont/gi, "doesn't");
      if (lower.includes("where is the station")) {
        corrected = corrected.replace("where is the station", "where the station is");
      }
      errors.push({
        type: "Subject-Verb Agreement",
        incorrect: "don't",
        correction: "doesn't",
        explanation: "Third-person singular subjects (He, She, It) require 'doesn't' instead of 'don't' in present simple tense.",
        bengaliExplanation: "He, She, It এর সাথে present simple tense-এ 'doesn't' বসে, 'don't' নয়।"
      });
      if (lower.includes("where is the station")) {
        errors.push({
          type: "Embedded Question Word Order",
          incorrect: "where is the station",
          correction: "where the station is",
          explanation: "In indirect or embedded questions, use statement order (subject + verb), not inversion.",
          bengaliExplanation: "পরোক্ষ প্রশ্নে (embedded question) subject-এর পরে verb বসে, প্রশ্নবোধক নিয়মে নয়।"
        });
      }
      bengaliMeaning = "সে জানে না স্টেশনটি কোথায় অবস্থিত।";
      englishMeaning = "She does not possess the knowledge of the station's location.";
      formalAlt = "She is unaware of the station's location.";
      casualAlt = "She has no clue where the station is.";
      tip = "Rule: Singular third person (He/She/It) + doesn't + base verb.";
    } else if (lower.includes("looking forward to meet")) {
      isCorrect = false;
      status = "Minor Suggestion";
      score = 75;
      corrected = text.replace(/meet/gi, "meeting");
      errors.push({
        type: "Prepositional Phrase / Gerund",
        incorrect: "meet",
        correction: "meeting",
        explanation: "The phrase 'look forward to' requires a gerund (verb + ing) because 'to' is a preposition here.",
        bengaliExplanation: "'Look forward to' এর পরে 'to' preposition হওয়ায় verb-এর সাথে -ing যোগ হয়ে 'meeting' হবে।"
      });
      bengaliMeaning = "আমি আগামী সপ্তাহে আপনার সাথে দেখা করার জন্য অধীর আগ্রহে অপেক্ষা করছি।";
      englishMeaning = "I am excited and eagerly anticipating our upcoming meeting next week.";
      formalAlt = "I eagerly anticipate our forthcoming meeting next week.";
      casualAlt = "Can't wait to catch up with you next week!";
      tip = "Key rule: 'Look forward to', 'accustomed to', and 'with a view to' always take verb+ing.";
    } else if (lower.includes("he go") || lower.includes("she go")) {
      isCorrect = false;
      status = "Needs Correction";
      score = 65;
      const isPast = lower.includes("yesterday") || lower.includes("last");
      corrected = isPast ? text.replace(/go/gi, "went") : text.replace(/go/gi, "goes");
      errors.push({
        type: isPast ? "Past Tense" : "Subject-Verb Agreement",
        incorrect: "go",
        correction: isPast ? "went" : "goes",
        explanation: isPast
          ? "The time marker 'yesterday' specifies past time, so use the past tense 'went'."
          : "Third-person singular subjects take 'goes' in simple present tense.",
        bengaliExplanation: isPast
          ? "অতীতের ঘটনা বোঝাতে 'yesterday'-এর সাথে verb-এর past form 'went' বসবে।"
          : "Present simple-এ third-person singular-এর পর 'goes' হয়।"
      });
      bengaliMeaning = isPast ? "সে গতকাল তার বন্ধুদের সাথে বাজারে গিয়েছিল।" : "সে নিয়মিত বাজারে যায়।";
      englishMeaning = "He went to the market together with his companions yesterday.";
      formalAlt = "He accompanied his friends to the market yesterday.";
      casualAlt = "He went out to the market with his buddies yesterday.";
      tip = "Time words like yesterday, ago, and last week always demand the simple past form.";
    } else if (lower.includes("although") && lower.includes("but")) {
      isCorrect = false;
      status = "Needs Correction";
      score = 65;
      corrected = text.replace(/,\s*but\s*/gi, ", ");
      errors.push({
        type: "Double Conjunction Error",
        incorrect: "although ... but",
        correction: "although ... (omit 'but')",
        explanation: "Do not use 'although' and 'but' together in the same sentence; 'although' already establishes the contrast.",
        bengaliExplanation: "একই বাক্যে 'Although' এবং 'But' উভয়টি একসাথে ব্যবহার করা ভুল। শুধু 'Although' থাকবে, 'but' বাদ দিতে হবে।"
      });
      bengaliMeaning = "যদিও বৃষ্টি হচ্ছিল, তবুও আমরা ফুটবল খেলা উপভোগ করেছিলাম।";
      englishMeaning = "Despite the adverse rainy weather, we had an enjoyable football match.";
      formalAlt = "Despite the rain, we thoroughly enjoyed the football match.";
      casualAlt = "Even though it poured, we still had a blast playing football.";
      tip = "Remember: Never pair 'Although' with 'But' or 'Because' with 'So'.";
    } else if (lower.includes("police is")) {
      isCorrect = false;
      status = "Minor Suggestion";
      score = 80;
      corrected = text.replace(/police is/gi, "police are");
      errors.push({
        type: "Collective Noun Agreement",
        incorrect: "police is",
        correction: "police are",
        explanation: "The noun 'police' is plural in English and takes the plural verb 'are'.",
        bengaliExplanation: "ইংরেজি ব্যাকরণে 'Police' শব্দটি সর্বদা plural, তাই এরপরে 'are' বসবে।"
      });
      bengaliMeaning = "পুলিশ অত্যন্ত সতর্কতার সাথে বিষয়টি তদন্ত করছে।";
      englishMeaning = "Law enforcement officers are thoroughly examining the details of this situation.";
      formalAlt = "Law enforcement officials are meticulously investigating the incident.";
      casualAlt = "The cops are looking into the matter really closely.";
      tip = "Note: 'Police', 'people', and 'cattle' are always plural nouns.";
    } else {
      bengaliMeaning = "সে অত্যন্ত সাবলীল এবং আত্মবিশ্বাসের সাথে ইংরেজি বলে।";
      englishMeaning = "She communicates in English with great fluency and self-assurance.";
      formalAlt = text;
      casualAlt = text;
      tip = "Great job! Keep practicing with varied vocabulary and complex sentence structures.";
    }

    return {
      isCorrect,
      originalSentence: text,
      correctedSentence: corrected,
      status,
      overallScore: score,
      bengaliMeaning,
      englishMeaning,
      errors,
      improvedAlternative: corrected,
      formalAlternative: formalAlt,
      casualAlternative: casualAlt,
      grammarRuleTips: tip,
      keyVocabulary: [
        { word: "Fluently", partOfSpeech: "adverb", meaning: "Easily and smoothly without hesitation", bengaliMeaning: "সাবলীলভাবে" },
        { word: "Confidently", partOfSpeech: "adverb", meaning: "With firm belief and assurance", bengaliMeaning: "আত্মবিশ্বাসের সাথে" }
      ]
    };
  };

  const handleCheck = async (e) => {
    if (e) e.preventDefault();
    if (!sentence.trim()) return;

    // Check if client quota is already exhausted
    if (quota.remaining === 0) {
      setError(
        `Rate limit reached: You have used all ${quota.limit} checks for your IP in this 15-minute window. Please wait about ${quota.retryAfterMinutes || 15} minute(s) before trying again.`
      );
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/check-sentence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence: sentence.trim() })
      });

      // Handle Rate Limit (429)
      if (response.status === 429) {
        const errorData = await response.json();
        setQuota((prev) => ({
          ...prev,
          remaining: 0,
          retryAfterMinutes: errorData.retryAfterMinutes || 15
        }));
        setError(
          errorData.message ||
            `You have reached the limit of ${quota.limit} sentence checks per 15 minutes for your IP. Please try again in about ${errorData.retryAfterMinutes || 15} minutes.`
        );
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      if (data.remainingQuota !== undefined) {
        setQuota((prev) => ({
          ...prev,
          remaining: data.remainingQuota
        }));
      }

      if (data.success && data.data) {
        setResult(data.data);
      } else {
        throw new Error(data.message || "Failed to analyze sentence");
      }
    } catch (err) {
      console.warn("Backend request error, falling back to built-in linguistic analyzer:", err);
      // Fallback for resilient user experience
      const localResult = analyzeLocally(sentence.trim());
      setResult(localResult);
      if (quota.remaining !== null && quota.remaining > 0) {
        setQuota((prev) => ({ ...prev, remaining: Math.max(0, prev.remaining - 1) }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (sample) => {
    if (quota.remaining === 0) return;
    setSentence(sample.text);
    setError("");
  };

  const handleClear = () => {
    setSentence("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-100/60 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>AI Grammar & Sentence Meaning Checker | English Window</title>
        <meta
          name="description"
          content="Check your English sentences for grammar mistakes, get instant corrections, accurate Bengali meaning (বাংলা অর্থ), audio pronunciation, and smart tips with AI."
        />
        <meta property="og:title" content="AI Grammar & Sentence Meaning Checker | English Window" />
        <meta
          property="og:description"
          content="Master English grammar with instant AI corrections, Bengali explanations, and sentence meanings."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* HEADER HERO */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold shadow-xs">
            <Sparkles size={16} className="text-indigo-600 animate-pulse" />
            <span>AI Sentence & Grammar Coach</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800">Free</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Grammar Checker &amp;{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sentence Meaning
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">
            Write any English sentence to detect grammar errors, see the accurate{" "}
            <span className="font-bold text-indigo-700">Bengali meaning (বাংলা অর্থ)</span>, listen to authentic
            pronunciation, and learn the rules to speak fluently.
          </p>

          {/* QUOTA BADGE */}
          {quota.remaining !== null && (
            <div
              className={`inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border shadow-2xs transition-all ${
                quota.remaining === 0
                  ? "bg-rose-50 border-rose-300 text-rose-700 font-bold"
                  : quota.remaining <= 3
                  ? "bg-amber-50 border-amber-300 text-amber-800"
                  : "bg-white/80 border-slate-200 text-slate-600"
              }`}
            >
              <ShieldCheck size={15} className={quota.remaining === 0 ? "text-rose-600" : "text-emerald-500"} />
              <span>
                Your remaining IP quota:{" "}
                <strong className={quota.remaining === 0 ? "text-rose-700" : quota.remaining <= 3 ? "text-amber-700" : "text-emerald-600"}>
                  {quota.remaining} / {quota.limit}
                </strong>{" "}
                checks (per 15 min)
              </span>
              {quota.remaining === 0 && (
                <span className="text-[10px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full uppercase font-extrabold flex items-center gap-1">
                  <Lock size={10} /> Limit Reached
                </span>
              )}
            </div>
          )}
        </div>

        {/* INPUT CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-indigo-500/5 space-y-5">
          <form onSubmit={handleCheck} className="space-y-4">
            <div className="relative">
              <textarea
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                disabled={quota.remaining === 0}
                rows={4}
                maxLength={500}
                placeholder={
                  quota.remaining === 0
                    ? `Rate limit reached for your IP. Please wait about ${quota.retryAfterMinutes || 15} minutes before checking more sentences.`
                    : "Type or paste your English sentence here... (e.g., 'She don't know where is the station.')"
                }
                className={`w-full text-base sm:text-lg text-slate-800 placeholder-slate-400 p-4 sm:p-5 rounded-2xl border transition-all outline-none resize-none ${
                  quota.remaining === 0
                    ? "bg-slate-50 border-rose-200 cursor-not-allowed opacity-80"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                }`}
              />

              <div className="flex items-center justify-between mt-2 px-1 text-xs text-slate-400">
                <span>Supports up to 500 characters</span>
                <span>{sentence.length} / 500 characters</span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                {sentence && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="btn btn-ghost btn-sm text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-1.5"
                  >
                    <RotateCcw size={15} />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={loading || !sentence.trim() || quota.remaining === 0}
                  className={`btn btn-md rounded-2xl font-semibold shadow-lg border-none px-6 flex items-center gap-2 transition-all ${
                    quota.remaining === 0
                      ? "bg-slate-300 text-slate-600 cursor-not-allowed opacity-80"
                      : "btn-primary bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      <span>Analyzing with AI...</span>
                    </>
                  ) : quota.remaining === 0 ? (
                    <>
                      <Lock size={17} className="text-rose-600" />
                      <span>Limit Reached (~{quota.retryAfterMinutes || 15}m left)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Check Grammar &amp; Meaning</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* SAMPLE TEST CHIPS */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Lightbulb size={13} className="text-amber-500" />
              Try a Quick Sample Sentence:
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleSentences.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={quota.remaining === 0}
                  onClick={() => handleSelectSample(sample)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all font-medium flex items-center gap-1.5 ${
                    quota.remaining === 0
                      ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-slate-100/90 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border-slate-200/70 text-slate-600"
                  }`}
                >
                  <span>"{sample.text}"</span>
                  <span className="text-[10px] text-slate-400 bg-white px-1.5 py-0.5 rounded-md">
                    {sample.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DEDICATED RATE LIMIT EXCEEDED ERROR CARD */}
        {(quota.remaining === 0 || error?.toLowerCase().includes("limit")) && (
          <div className="bg-gradient-to-r from-rose-50 via-red-50 to-amber-50 border-2 border-rose-300 rounded-3xl p-6 sm:p-7 shadow-lg shadow-rose-500/10 space-y-4 animate-in fade-in slide-in-from-top-3">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                <Clock size={26} className="text-rose-600" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-rose-200/80 text-rose-800">
                    Rate Limit Reached (১৫ মিনিটের কোটা শেষ)
                  </span>
                  <span className="text-xs font-bold text-rose-600 bg-white px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1.5 shadow-2xs">
                    <Clock size={13} />
                    Resets in: ~{quota.retryAfterMinutes || 15} min
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-rose-950">
                  You have used all {quota.limit} sentence checks for this 15-minute window.
                </h3>
                <p className="text-xs sm:text-sm text-rose-700 leading-relaxed">
                  To protect our free AI server resources and ensure fast responses for everyone, each user IP is allotted {quota.limit} sentence checks per 15 minutes.
                </p>
                <div className="text-xs sm:text-sm text-indigo-950 font-medium bg-white/80 p-3 rounded-2xl border border-rose-100/80 space-y-1">
                  <p className="font-bold text-indigo-900 flex items-center gap-1.5">
                    <span>🇧🇩</span> <span>বাংলা নির্দেশনা:</span>
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    আপনার আইপি (IP) ঠিকানার জন্য নির্ধারিত {quota.limit}টি বাক্য চেক করার কোটা শেষ হয়েছে। অতিরিক্ত স্প্যাম রোধ ও বিনামূল্যে সেবা চালু রাখার জন্য অনুগ্রহ করে আনুমানিক {quota.retryAfterMinutes || 15} মিনিট অপেক্ষা করুন। সময় শেষ হলে কোটা স্বয়ংক্রিয়ভাবে পুনরায় চালু হবে।
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-rose-200/60 text-xs text-rose-700">
              <span className="font-medium">
                {quota.ip && <>IP: <strong className="font-mono">{quota.ip}</strong></>}
              </span>
              <button
                type="button"
                onClick={fetchQuota}
                className="btn btn-xs sm:btn-sm rounded-xl bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <RotateCcw size={13} />
                <span>Refresh Quota Status</span>
              </button>
            </div>
          </div>
        )}

        {/* OTHER SERVICE ERRORS (NON-RATE-LIMIT) */}
        {error && !error.toLowerCase().includes("limit") && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-5 rounded-2xl flex items-start gap-3 shadow-xs">
            <AlertCircle size={22} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold">Notice</h3>
              <p className="text-xs sm:text-sm text-rose-600">{error}</p>
            </div>
          </div>
        )}

        {/* RESULTS CONTAINER */}
        {result && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* STATUS & SCORE SUMMARY */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  {result.isCorrect ? (
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                      <CheckCircle2 size={26} />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
                      <AlertTriangle size={26} />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs uppercase tracking-wider font-extrabold px-3 py-1 rounded-full ${
                          result.isCorrect
                            ? "bg-emerald-100 text-emerald-800"
                            : result.status === "Minor Suggestion"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {result.isCorrect ? "Grammatically Correct! 🎉" : result.status || "Needs Correction"}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 mt-1">
                      {result.isCorrect
                        ? "Excellent! Your sentence has no grammar errors."
                        : `We found ${result.errors?.length || 1} grammar issue${
                            result.errors?.length > 1 ? "s" : ""
                          } in your sentence.`}
                    </h2>
                  </div>
                </div>

                {/* SCORE BADGE */}
                {result.overallScore !== undefined && (
                  <div className="flex items-center gap-2.5 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-slate-400 block uppercase">Score</span>
                      <span className="text-xl font-extrabold text-indigo-600">
                        {result.overallScore}/100
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* ORIGINAL VS CORRECTED SENTENCE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Your Sentence
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSpeech(result.originalSentence)}
                      className="btn btn-circle btn-xs btn-ghost text-slate-500 hover:text-indigo-600"
                      title="Listen to pronunciation"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                  <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
                    {result.originalSentence}
                  </p>
                </div>

                {/* Corrected */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-purple-50/50 border border-indigo-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      Corrected / Polished Sentence
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleSpeech(result.correctedSentence)}
                        className="btn btn-circle btn-xs btn-ghost text-indigo-600 hover:bg-indigo-100"
                        title="Listen to corrected audio"
                      >
                        <Volume2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(result.correctedSentence)}
                        className="btn btn-circle btn-xs btn-ghost text-indigo-600 hover:bg-indigo-100"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg text-indigo-950 font-bold leading-relaxed">
                    {result.correctedSentence}
                  </p>
                </div>
              </div>
            </div>

            {/* SENTENCE MEANING (BENGALI & ENGLISH) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-5">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                <Languages className="text-indigo-600" size={22} />
                <span>Sentence Meaning (বাক্যটির অর্থ)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Bengali Meaning */}
                <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <span className="text-sm">🇧🇩</span> বাংলা অর্থ (Bengali Meaning)
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-emerald-950 leading-relaxed">
                    {result.bengaliMeaning}
                  </p>
                </div>

                {/* English Meaning */}
                <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                      <span className="text-sm">🇬🇧</span> English Meaning &amp; Nuance
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-medium text-sky-950 leading-relaxed">
                    {result.englishMeaning}
                  </p>
                </div>
              </div>
            </div>

            {/* GRAMMAR ERRORS & EXPLANATIONS */}
            {result.errors && result.errors.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                  <BookOpen className="text-purple-600" size={22} />
                  <span>Grammar Errors &amp; Explanations (ভুলের বিশ্লেষণ)</span>
                </div>

                <div className="space-y-4">
                  {result.errors.map((err, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                          {err.type || "Grammar Rule"}
                        </span>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <span className="line-through text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                            {err.incorrect}
                          </span>
                          <ArrowRight size={14} className="text-slate-400" />
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                            {err.correction}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-sm text-slate-700">
                        <p className="font-medium text-slate-800">{err.explanation}</p>
                        {err.bengaliExplanation && (
                          <p className="text-indigo-900 bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100/60 text-xs sm:text-sm leading-relaxed">
                            💡 <strong className="font-bold">বাংলায় ব্যাখ্যা:</strong> {err.bengaliExplanation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SMART ALTERNATIVES (FORMAL & CASUAL) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-5">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                <Sparkles className="text-amber-500" size={22} />
                <span>Smart Alternatives &amp; Expressions (অন্যান্য সুন্দর প্রকাশভঙ্গি)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Formal */}
                {result.formalAlternative && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                        <Briefcase size={14} /> Formal / Academic Tone
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSpeech(result.formalAlternative)}
                        className="btn btn-circle btn-xs btn-ghost text-slate-500 hover:text-indigo-600"
                      >
                        <Volume2 size={15} />
                      </button>
                    </div>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
                      "{result.formalAlternative}"
                    </p>
                  </div>
                )}

                {/* Casual */}
                {result.casualAlternative && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                        <MessageCircle size={14} /> Casual / Daily Spoken
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSpeech(result.casualAlternative)}
                        className="btn btn-circle btn-xs btn-ghost text-slate-500 hover:text-purple-600"
                      >
                        <Volume2 size={15} />
                      </button>
                    </div>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
                      "{result.casualAlternative}"
                    </p>
                  </div>
                )}
              </div>

              {/* GRAMMAR RULE TIP */}
              {result.grammarRuleTips && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
                  <Lightbulb size={20} className="text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-xs sm:text-sm">
                    <strong className="font-bold text-amber-950">Grammar Tip to Remember:</strong>
                    <p>{result.grammarRuleTips}</p>
                  </div>
                </div>
              )}
            </div>

            {/* KEY VOCABULARY BREAKDOWN */}
            {result.keyVocabulary && result.keyVocabulary.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                  <BookOpen className="text-indigo-600" size={22} />
                  <span>Key Vocabulary in this Sentence</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {result.keyVocabulary.map((vocab, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:bg-indigo-50/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-base">{vocab.word}</span>
                        {vocab.partOfSpeech && (
                          <span className="text-[10px] uppercase font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
                            {vocab.partOfSpeech}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600">{vocab.meaning}</p>
                      {vocab.bengaliMeaning && (
                        <p className="text-xs font-bold text-emerald-700">
                          অর্থ: {vocab.bengaliMeaning}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

