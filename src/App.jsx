import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchMovie = async (movie = movieName) => {
    if (!movie.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${movie}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }

      setSearched(true);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    searchMovie("Avengers");
  }, []);

  return (
    <div className="container">
      <h1>Movie Search App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter movie name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovie();
            }
          }}
        />

        <button
          onClick={() => searchMovie()}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {searched && !loading && movies.length === 0 && (
        <h2>Movie Not Found</h2>
      )}

      <div className="movie-container">
        {!loading &&
          movies.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.Title}
              />

              <h3>{movie.Title}</h3>

              <p>{movie.Year}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;

