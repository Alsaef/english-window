import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import {
  Search,
  Film,
  ExternalLink
} from "lucide-react";

const MovieVocab = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [search, setSearch] =
    useState("");

  useEffect(() => {
    const fetchMovies =
      async () => {
        try {
          const res =
            await axios.get(
              "https://english-window-server.vercel.app/movies"
            );

          setMovies(
            res.data.data
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchMovies();
  }, []);

  const filteredMovies =
    useMemo(() => {
      return movies.filter(
        (movie) =>
          movie.movieName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          movie.level
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [movies, search]);

  return (
    <div className="min-h-screen bg-base-200 p-5">

      {/* HERO */}

      <div className="hero rounded-3xl bg-base-100 shadow-xl mb-8">

        <div className="hero-content text-center py-10">

          <div>

            <div className="flex justify-center mb-3">

              <Film
                size={45}
              />

            </div>

            <h1 className="text-4xl font-bold">

              Movie Vocabulary

            </h1>

            <p className="py-3 opacity-70">

              Learn English
              vocabulary through
              movies and improve
              your speaking.

            </p>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="stats shadow w-full mb-6">

        <div className="stat">

          <div className="stat-title">

            Total Movies

          </div>

          <div className="stat-value">

            {
              filteredMovies.length
            }

          </div>

        </div>

      </div>

      {/* SEARCH */}

      <div className="mb-8">

        <label className="input input-bordered flex items-center gap-2">

          <Search
            size={18}
          />

          <input
            type="text"
            className="grow"
            placeholder="Search movie..."
            value={search}
            onChange={(
              e
            ) =>
              setSearch(
                e.target.value
              )
            }
          />

        </label>

      </div>

      {/* LOADING */}

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {[...Array(6)].map(
            (_, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-xl p-4"
              >
                <div className="skeleton h-7 w-40 mb-4"></div>

                <div className="skeleton h-5 w-24 mb-3"></div>

                <div className="skeleton h-10 w-full"></div>
              </div>
            )
          )}

        </div>
      ) : (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredMovies.map(
            (movie) => (

              <div
                key={
                  movie._id
                }
                className="
                card
                bg-base-100
                shadow-xl
                hover:-translate-y-2
                hover:shadow-2xl
                duration-300
                "
              >

                <div className="card-body">

                  <div className="flex justify-between">

                    <h2 className="card-title">

                      {
                        movie.movieName
                      }

                    </h2>

                    <div className="badge badge-primary">

                      {
                        movie.level
                      }

                    </div>

                  </div>

                  <p className="text-sm opacity-70">

                    Improve your
                    vocabulary
                    through this
                    movie content.

                  </p>

                  <div className="card-actions justify-end mt-4">

                    <a
                      href={
                        movie.link
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                    >

                      Learn

                      <ExternalLink
                        size={
                          16
                        }
                      />

                    </a>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
};

export default MovieVocab;