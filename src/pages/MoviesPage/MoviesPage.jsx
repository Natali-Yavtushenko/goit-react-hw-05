import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies } from "../../services/api";
import MyForm from "../../components/Form/Form";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      try {
        console.log("Fetching movies for query:", query);
        const data = await searchMovies(query);
        console.log("Fetched data:", data);
        setMovies(data.results || []);
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
        {Array.isArray(movies) &&
          movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default MoviesPage;
