import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies } from "../../services/api";
import MyForm from "../../components/Form/Form";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      try {
        const data = await searchMovies(query);
        setMovies(data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (newQuery) => {
    if (newQuery.trim() === "") {
      setSearchParams({});
    } else {
      setSearchParams({ query: newQuery });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <MyForm handleSearch={handleSearch} />
      <ul>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </ul>
      <MovieList movies={movies} query={query} />
    </>
  );
};

export default MoviesPage;
