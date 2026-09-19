import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Search, Film, ExternalLink, Sparkles, PlayCircle } from "lucide-react";

const MovieVocab = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          "https://english-window-server.vercel.app/movies"
        );
        setMovies(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter(
      (movie) =>
        movie.movieName?.toLowerCase().includes(search.toLowerCase()) ||
        movie.level?.toLowerCase().includes(search.toLowerCase())
    );
  }, [movies, search]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Movie Vocabulary | English Window</title>
        <meta name="description" content="Learn authentic conversational English and vocabulary from popular movies and dialogues." />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        
        {/* HERO BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white shadow-xl mb-8 p-6 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 text-white border border-white/20">
              <Film size={16} className="text-cyan-300" />
              <span>Cinema & Conversational Fluency</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Movie Vocabulary Collection
            </h1>

            <p className="mt-4 text-sm sm:text-lg text-indigo-100 leading-relaxed max-w-2xl mx-auto">
              Learn everyday conversational English vocabulary through popular movie scenes, dialogues, and speaking exercises.
            </p>
          </div>
        </div>

        {/* STATS & SEARCH */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs sm:col-span-1">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Movies</div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 mt-1">
              {filteredMovies.length}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Lesson materials available</div>
          </div>

          <div className="sm:col-span-2 flex items-center">
            <div className="relative w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-3xl shadow-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium transition"
                placeholder="Search movie by title or level..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                <div className="skeleton h-6 w-40 mb-3 rounded-lg"></div>
                <div className="skeleton h-5 w-20 mb-4 rounded-full"></div>
                <div className="skeleton h-12 w-full rounded-2xl"></div>
              </div>
            ))}
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="rounded-3xl bg-white py-16 px-6 text-center shadow-xs border border-slate-200 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
              🎬
            </div>
            <h3 className="text-xl font-bold text-slate-800">No movies found</h3>
            <p className="mt-2 text-sm text-slate-500">
              No movie matched your search "{search}".
            </p>
            <button
              onClick={() => setSearch("")}
              className="btn btn-outline btn-primary btn-sm rounded-xl mt-4"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie) => (
              <div
                key={movie._id}
                className="group bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {movie.movieName}
                    </h3>
                    <span className="badge badge-primary badge-outline text-xs font-semibold py-2.5 px-3">
                      {movie.level || "Beginner"}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    Boost listening comprehension and vocabulary retention with authentic dialogues from this film.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <a
                    href={movie.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold flex items-center gap-1.5 shadow-sm shadow-indigo-500/20 border-none transition-all hover:scale-105"
                  >
                    <span>Learn Vocab</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MovieVocab;