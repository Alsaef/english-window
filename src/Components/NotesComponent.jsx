import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Search,
  ExternalLink,
  ArrowUpDown,
  FileText,
  Sparkles,
  BookOpen
} from "lucide-react";

export default function NotesComponent() {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchFn = async () => {
    const apiUri = "./Notes.json";

    try {
      setLoading(true);
      setError("");

      const res = await fetch(apiUri);

      if (!res.ok) {
        throw new Error("Failed to fetch notes");
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong loading notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFn();
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(data.map((item) => item.category).filter(Boolean))];
  }, [data]);

  const filteredData = useMemo(() => {
    const term = search.toLowerCase().trim();

    const filtered = data.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      return sortAsc ? a.id - b.id : b.id - a.id;
    });
  }, [search, sortAsc, selectedCategory, data]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Grammar Vault | English Window Master Notes</title>
        <meta name="description" content="Access master English grammar notes on Tenses, Voice, Modals, Prepositions, and WH questions." />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        
        {/* HERO BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white shadow-xl mb-8 p-6 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 text-white border border-white/20">
              <BookOpen size={16} className="text-indigo-200" />
              <span>Comprehensive Master Notes</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Grammar Vault Master Notes
            </h1>

            <p className="mt-4 text-sm sm:text-lg text-indigo-100 leading-relaxed max-w-2xl mx-auto">
              Access in-depth Google Docs grammar guides covering Tenses, Modals, Voice, Prepositions, and WH Questions.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Vault Notes</div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 mt-1">
              {data.length}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Master docs available</div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filtered Count</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
              {filteredData.length}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Matches active search</div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Topic</div>
            <div className="text-xl sm:text-2xl font-bold text-purple-600 mt-1 truncate">
              {selectedCategory}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Category filter applied</div>
          </div>
        </div>

        {/* SEARCH AND SORT */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium transition"
              placeholder="Search grammar notes or categories..."
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

        {/* ERROR */}
        {error && (
          <div className="alert alert-error mb-6 rounded-2xl shadow">
            <span>{error}</span>
          </div>
        )}

        {/* TABLE CONTENT */}
        {loading ? (
          <div className="overflow-x-auto bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="w-16">ID</th>
                  <th>Title</th>
                  <th className="w-48">Category</th>
                  <th className="w-32 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(4)].map((_, index) => (
                  <tr key={index}>
                    <td><div className="skeleton h-8 w-10 rounded-xl"></div></td>
                    <td><div className="skeleton h-6 w-3/4 rounded-lg"></div></td>
                    <td><div className="skeleton h-6 w-28 rounded-lg"></div></td>
                    <td><div className="skeleton h-10 w-24 mx-auto rounded-xl"></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="rounded-3xl bg-white py-16 px-6 text-center shadow-xs border border-slate-200 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-slate-800">No notes found</h3>
            <p className="mt-2 text-sm text-slate-500">
              No notes matched your search "{search}".
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
          <div className="overflow-x-auto rounded-3xl bg-white shadow-sm border border-slate-200/90">
            <table className="table w-full">
              <thead className="bg-slate-50/80 text-slate-500 text-xs uppercase font-bold tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="w-16 text-center py-4">ID</th>
                  <th className="py-4">Grammar Note Title</th>
                  <th className="w-52 py-4">Category</th>
                  <th className="w-36 text-center py-4">Action</th>
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

                    {/* TITLE */}
                    <td className="py-5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
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
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100/80">
                        {item.category}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="text-center">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold inline-flex items-center gap-1.5 shadow-sm shadow-indigo-500/20 border-none transition-all hover:scale-105"
                      >
                        <span>Open Note</span>
                        <ExternalLink size={13} />
                      </a>
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