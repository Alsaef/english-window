import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Search, 
  ExternalLink, 
  ArrowUpDown, 
  Sparkles, 
  Copy, 
  Check, 
  FileText 
} from "lucide-react";

export default function SmartAndPhrasalEnglish() {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/smartEnglish.json");

      if (!res.ok) {
        throw new Error("Failed to fetch Smart English documents");
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong loading the data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    return ["All", ...new Set(data.map((item) => item.category).filter(Boolean))];
  }, [data]);

  // Filter and sort the table data
  const filteredData = useMemo(() => {
    const term = search.toLowerCase().trim();

    const filtered = data.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      return sortAsc ? a.id - b.id : b.id - a.id;
    });
  }, [search, sortAsc, selectedCategory, data]);

  // Copy link to clipboard
  const handleCopy = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Smart English & Daily Phrasals | English Window</title>
        <meta name="description" content="Explore smart spoken English phrases, daily phrasal expressions, and real-life conversation tables." />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        
        {/* HERO HEADER */}
        <div className="hero rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white shadow-xl mb-8 p-6 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 text-white border border-white/20">
              <Sparkles size={16} className="text-amber-300" />
              <span>Smart English & Phrasal Learning</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Smart English & Daily Phrasal English
            </h1>

            <p className="mt-4 text-sm sm:text-lg text-indigo-100 leading-relaxed max-w-2xl mx-auto">
              Explore essential spoken English phrases, real-life examples tables, and master Google Docs notes with instant access.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Documents</div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 mt-1">
              {data.length}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Google Docs in Library</div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filtered Results</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
              {filteredData.length}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Matching active filter</div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Category</div>
            <div className="text-xl sm:text-2xl font-bold text-purple-600 mt-1 truncate">
              {selectedCategory}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Filter category applied</div>
          </div>
        </div>

        {/* SEARCH AND SORT BAR */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium transition"
              placeholder="Search by title, description or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="btn rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 px-5 shadow-xs font-bold text-sm flex items-center gap-2 transition"
            onClick={() => setSortAsc(!sortAsc)}
          >
            <ArrowUpDown size={16} className="text-indigo-500" />
            <span>Sort: {sortAsc ? "ID (1 → 9)" : "ID (9 → 1)"}</span>
          </button>
        </div>

        {/* CATEGORY FILTER CHIPS */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div className="alert alert-error mb-6 rounded-2xl shadow">
            <span>{error}</span>
          </div>
        )}

        {/* LOADING SKELETON */}
        {loading ? (
          <div className="overflow-x-auto bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="w-16">ID</th>
                  <th>Document Title</th>
                  <th className="w-48">Category</th>
                  <th className="w-40 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(3)].map((_, index) => (
                  <tr key={index}>
                    <td><div className="skeleton h-8 w-10 rounded-xl"></div></td>
                    <td>
                      <div className="skeleton h-6 w-3/4 mb-2 rounded-lg"></div>
                      <div className="skeleton h-4 w-1/2 rounded-lg"></div>
                    </td>
                    <td><div className="skeleton h-6 w-28 rounded-lg"></div></td>
                    <td><div className="skeleton h-10 w-24 mx-auto rounded-xl"></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : filteredData.length === 0 ? (
          /* EMPTY STATE */
          <div className="rounded-3xl bg-white py-16 px-6 text-center shadow-xs border border-slate-200 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-slate-800">No documents found</h3>
            <p className="mt-2 text-sm text-slate-500">
              No results matched your search "{search}".
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="btn btn-outline btn-primary btn-sm rounded-xl mt-4"
            >
              Clear Search
            </button>
          </div>
        ) : (
          /* TABLE LIST */
          <div className="overflow-x-auto rounded-3xl bg-white shadow-sm border border-slate-200/90">
            <table className="table w-full">
              <thead className="bg-slate-50/80 text-slate-500 text-xs uppercase font-bold tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="w-16 text-center py-4">ID</th>
                  <th className="py-4">Title & Description</th>
                  <th className="w-52 py-4">Category</th>
                  <th className="w-44 text-center py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* ID */}
                    <td className="text-center font-bold">
                      <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 inline-flex items-center justify-center text-xs font-black">
                        {item.id}
                      </span>
                    </td>

                    {/* TITLE & DESCRIPTION */}
                    <td className="py-5">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FileText size={20} />
                        </div>
                        <div>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold text-base sm:text-lg text-slate-900 hover:text-indigo-600 transition-colors inline-flex items-center gap-1.5 group"
                          >
                            <span>{item.title}</span>
                            <ExternalLink size={15} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-indigo-600" />
                          </a>

                          {item.description && (
                            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed max-w-2xl">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100/80">
                        {item.category || "General"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {/* OPEN IN GOOGLE DOCS */}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold flex items-center gap-1.5 shadow-sm shadow-indigo-500/20 border-none transition-all hover:scale-105"
                          title="Open Google Doc in new tab"
                        >
                          <span>Open Doc</span>
                          <ExternalLink size={13} />
                        </a>

                        {/* COPY LINK */}
                        <button
                          onClick={() => handleCopy(item.id, item.url)}
                          className="btn btn-sm btn-circle btn-ghost text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          title="Copy Google Doc Link"
                          aria-label="Copy link"
                        >
                          {copiedId === item.id ? (
                            <Check size={16} className="text-emerald-600" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
