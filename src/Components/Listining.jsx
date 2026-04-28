import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieVocab = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("https://english-window-server.vercel.app/movies");
        setMovies(res.data.data);
      } catch (error) {
        console.error("Error fetching movie vocab:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">
        🎬 Movie Vocabulary List
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="border border-blue-500 rounded-xl p-4 shadow-md hover:scale-110 duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-500">
              {movie.movieName}
            </h2>
            <p>
              <span className="font-bold">📊 Level:</span> {movie.level}
            </p>

            <a
              href={movie.link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline mt-2 inline-block"
            >
              🔗 Learn
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieVocab;