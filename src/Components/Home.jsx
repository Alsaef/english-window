import React from 'react';
import { Link } from 'react-router-dom';
import LessonToggle from './LessonToggle';
import ShowLesson from './ShowLesson';
import useGetAllVocabulary from '../Hook/useGetAllVocabulary';
import CountUp from 'react-countup';
import useResetLesson from '../Hook/useResetLesson';
import { 
  Sparkles, 
  BookOpen, 
  Film, 
  FileText, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Volume2 
} from 'lucide-react';

const Home = () => {
  const toggleApi = 'https://openapi.programming-hero.com/api/levels/all';
  const showLessonApi = 'https://openapi.programming-hero.com/api/level/';
  const [totalV] = useGetAllVocabulary();
  useResetLesson();

  const features = [
    {
      title: 'Smart English & Phrasals',
      description: 'Replace basic phrases with smart spoken expressions & daily phrasals.',
      icon: Sparkles,
      link: '/smart-english',
      color: 'from-amber-500 to-orange-500',
      badge: 'Trending'
    },
    {
      title: 'Movie Vocabulary',
      description: 'Learn contextual colloquial English used in popular movies and shows.',
      icon: Film,
      link: '/movies-vocab',
      color: 'from-blue-500 to-cyan-500',
      badge: 'Popular'
    },
    {
      title: 'Grammar Vault Notes',
      description: 'Curated master notes covering tenses, prepositions, modals, and voice.',
      icon: FileText,
      link: '/grammar-vault',
      color: 'from-indigo-500 to-purple-500',
      badge: 'Essential'
    },
    {
      title: 'Free Ebooks & PDFs',
      description: 'Download standard grammar books and vocabulary builders for offline study.',
      icon: BookOpen,
      link: '/free-ebooks',
      color: 'from-emerald-500 to-teal-500',
      badge: 'Free'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50">
        {/* Glow ambient background circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-400/10 via-purple-300/10 to-pink-300/10 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center">
          
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100/80 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-indigo-700 shadow-xs mb-6 hover:bg-indigo-100/60 transition-colors">
            <Sparkles size={16} className="text-indigo-600 animate-pulse" />
            <span>The Modern English Learning Window</span>
          </div>

          {/* MAIN HEADLINE */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Master English Vocabulary &{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Smart Spoken Phrases
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Step-by-step categorized lessons, real-life audio pronunciation, master grammar notes, and smart conversation phrases designed for Bengali learners.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="#lessons"
              className="btn btn-lg rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold shadow-lg shadow-indigo-500/25 border-none px-8 flex items-center gap-2 transition-all hover:scale-105"
            >
              <GraduationCap size={20} />
              <span>Explore Lessons</span>
            </a>

            <Link
              to="/smart-english"
              className="btn btn-lg rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-200 shadow-xs px-8 flex items-center gap-2 transition-all hover:border-indigo-300 hover:text-indigo-600"
            >
              <Sparkles size={18} className="text-amber-500" />
              <span>Smart English Table</span>
            </Link>
          </div>

          {/* STATS STRIP */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm">
            <div className="p-3 text-center border-r border-slate-100 last:border-none">
              <div className="text-2xl sm:text-3xl font-black text-indigo-600">
                <CountUp duration={2.5} end={totalV?.length || 250} />+
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Core Vocabularies</div>
            </div>

            <div className="p-3 text-center border-r border-slate-100 last:border-none">
              <div className="text-2xl sm:text-3xl font-black text-purple-600">
                10+
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Progressive Lessons</div>
            </div>

            <div className="p-3 text-center border-r border-slate-100 last:border-none">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">
                100%
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Bengali Meaning & Audio</div>
            </div>

            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-500">
                Free
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Open To All Learners</div>
            </div>
          </div>

        </div>
      </section>

      {/* QUICK EXPLORATION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <Link
                key={index}
                to={feat.link}
                className="group relative p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {feat.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>Explore Now</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* LESSONS SECTION */}
      <section id="lessons" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen size={14} />
            <span>Interactive Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Select Your Learning Lesson
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Click on any lesson number below to load words with audio pronunciation and detailed usage notes.
          </p>
        </div>

        {/* LESSON TOGGLE BUTTONS */}
        <LessonToggle toggleApi={toggleApi} />

        {/* LESSON WORDS LIST */}
        <ShowLesson showLessonApi={showLessonApi} />

      </section>

    </div>
  );
};

export default Home;