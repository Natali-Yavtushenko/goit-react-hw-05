import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies } from "../../services/api";
import MyForm from "../../components/Form/Form";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await searchMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSearch = (newquery) => {
    setQuery(newquery);
  };

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
