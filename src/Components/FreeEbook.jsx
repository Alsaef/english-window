import React, { useEffect, useMemo, useState } from "react";

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

  // ✅ FIXED: Categories are created from the latest ebooks data
  const categories = useMemo(() => {
    return ["All", ...new Set(ebooks.map((ebook) => ebook.category))];
  }, [ebooks]);

  const filteredEbooks = useMemo(() => {
    return ebooks.filter((ebook) => {
      const matchesSearch =
        ebook.name.toLowerCase().includes(search.toLowerCase()) ||
        ebook.writerName.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        ebook.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // ✅ FIXED: Added `ebooks` to dependency array
  }, [ebooks, search, selectedCategory]);

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Free Ebook
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Explore our collection of free English learning ebooks and
            improve your grammar, vocabulary, and communication skills.
          </p>
        </div>

        {/* Search Box */}
        <div className="mx-auto mb-6 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search ebook or writer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 pr-12 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Ebook Cards */}
        {filteredEbooks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEbooks.map((ebook) => (
              <EbookCard key={ebook.id} ebook={ebook} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white py-16 text-center shadow-sm">
            <div className="mb-3 text-5xl">📚</div>

            <h2 className="text-xl font-semibold text-gray-800">
              No ebooks found
            </h2>

            <p className="mt-2 text-gray-500">
              Try another search term or category.
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
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Book Image */}
      <div className="flex h-64 items-center justify-center bg-gray-100">
        {ebook.imageUrl ? (
          <img
            src={ebook.imageUrl}
            alt={ebook.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="text-7xl">📖</div>

            <span className="mt-3 block text-sm font-medium text-gray-500">
              Free Ebook
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          {ebook.category}
        </span>

        <h2 className="mt-3 line-clamp-2 text-xl font-bold text-gray-900">
          {ebook.name}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          By{" "}
          <span className="font-medium text-gray-700">
            {ebook.writerName}
          </span>
        </p>

        <a
          href={ebook.URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Read Ebook
        </a>
      </div>
    </article>
  );
};

export default FreeEbook;