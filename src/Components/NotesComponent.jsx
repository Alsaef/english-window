import { useMemo, useState, useEffect } from "react";
import {
  Search,
  ExternalLink,
  Eye,
  ArrowUpDown
} from "lucide-react";

export default function NotesComponent() {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFn = async () => {
    const apiUri = "./Notes.json";

    try {
      setLoading(true);
      setError("");

      const res = await fetch(apiUri);

      if (!res.ok) {
        throw new Error(
          "Failed to fetch notes"
        );
      }

      const result = await res.json();

      setData(result);
    } catch (err) {
      setError(
        err.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFn();
  }, []);

  const filteredData = useMemo(() => {
    const filtered = data.filter(
      item =>
        item.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

    return filtered.sort(
      (a, b) =>
        sortAsc
          ? a.id - b.id
          : b.id - a.id
    );
  }, [search, sortAsc, data]);

  return (
    <div className="min-h-screen bg-base-200 p-6">

      {/* STATS */}

      <div className="stats shadow w-full mb-6">

        <div className="stat">

          <div className="stat-title">
            Total Notes
          </div>

          <div className="stat-value">
            {filteredData.length}
          </div>

        </div>

      </div>

      {/* SEARCH */}

      <div className="flex gap-4 mb-6">

        <label className="input input-bordered flex items-center gap-2 flex-1">

          <Search size={18} />

          <input
            type="text"
            className="grow"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </label>

        <button
          className="btn btn-primary"
          onClick={() =>
            setSortAsc(
              !sortAsc
            )
          }
        >
          <ArrowUpDown size={18} />
          Sort
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="alert alert-error mb-6">

          <span>
            {error}
          </span>

        </div>
      )}

      {/* LOADING SKELETON */}

      {loading ? (
        <div className="overflow-x-auto bg-base-100 rounded-2xl p-5 shadow">

          <table className="table">

            <thead>

              <tr>

                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {[...Array(6)].map(
                (_, index) => (

                  <tr key={index}>

                    <td>
                      <div className="skeleton h-8 w-12"></div>
                    </td>

                    <td>
                      <div className="skeleton h-8 w-56"></div>
                    </td>

                    <td>
                      <div className="skeleton h-8 w-24"></div>
                    </td>

                    <td>

                      <div className="flex gap-2">

                        <div className="skeleton h-10 w-10"></div>

                        <div className="skeleton h-10 w-10"></div>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      ) : (

        <div className="overflow-x-auto rounded-2xl bg-base-100 shadow-2xl">

          <table className="table table-zebra">

            <thead>

              <tr>

                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredData.map(
                (item) => (

                  <tr
                    key={item.id}
                  >

                    <td>

                      <div className="badge badge-primary">

                        {item.id}

                      </div>

                    </td>

                    <td className="font-semibold">

                      {item.title}

                    </td>

                    <td>

                      <div className="badge badge-outline">

                        {item.category}

                      </div>

                    </td>

                    <td>

                      <div className="flex gap-2">


                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-primary"
                        >

                          <ExternalLink size={16} />

                        </a>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}