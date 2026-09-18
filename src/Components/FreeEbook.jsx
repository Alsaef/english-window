import React, { useEffect, useMemo, useState } from "react";
import { BookOpen, Search, ExternalLink, Sparkles } from "lucide-react";

const FreeEbook = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [ebooks, setEbooks] = useState([]);

  useEffect(() => {
    fetch("/freebook.json")
      .then((res) => res.json())
      .then((data) => setEbooks(data))
      .catch((error) => console.error("Error loading ebooks:", error));
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(ebooks.map((ebook) => ebook.category).filter(Boolean))];
  }, [ebooks]);

  const filteredEbooks = useMemo(() => {
    return ebooks.filter((ebook) => {
      const matchesSearch =
        ebook.name?.toLowerCase().includes(search.toLowerCase()) ||
        ebook.writerName?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || ebook.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [ebooks, search, selectedCategory]);

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* HERO BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white shadow-xl mb-10 p-6 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 text-white border border-white/20">
              <BookOpen size={16} className="text-emerald-300" />
              <span>Digital Library & Downloads</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Free English Learning Ebooks
            </h1>

            <p className="mt-4 text-sm sm:text-lg text-indigo-100 leading-relaxed max-w-2xl mx-auto">
              Download standard English grammar reference books, vocabulary guides, and communication workbooks for free.
            </p>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="mx-auto mb-6 max-w-2xl">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search ebook title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-4 text-slate-800 placeholder-slate-400 shadow-xs outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm font-medium"
            />
          </div>
        </div>

        {/* CATEGORY BUTTONS */}
        {categories.length > 1 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* EBOOK CARDS */}
        {filteredEbooks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEbooks.map((ebook, idx) => (
              <EbookCard key={ebook.id || idx} ebook={ebook} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white py-16 px-6 text-center shadow-xs border border-slate-200 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
              📚
            </div>
            <h3 className="text-xl font-bold text-slate-800">No ebooks found</h3>
            <p className="mt-2 text-sm text-slate-500">
              Try searching with another keyword or pick a different category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

/* Ebook Card */
const EbookCard = ({ ebook }) => {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-xs border border-slate-200/90 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between">
      
      {/* Book Image */}
      <div className="flex h-56 items-center justify-center bg-slate-100/70 overflow-hidden relative">
        {ebook.imageUrl ? (
          <img
            src={ebook.imageUrl}
            alt={ebook.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-center p-6">
            <div className="text-6xl mb-2">📖</div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              English Window Ebook
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-indigo-700 shadow-xs border border-slate-100">
            {ebook.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {ebook.name}
          </h3>

          <p className="mt-1.5 text-xs text-slate-500">
            By <span className="font-semibold text-slate-700">{ebook.writerName}</span>
          </p>
        </div>

        <a
          href={ebook.URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all hover:scale-102"
        >
          <span>Read Ebook</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
};

export default FreeEbook;