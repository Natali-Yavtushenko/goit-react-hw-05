import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies } from "../../services/api";
import MyForm from "../../components/Form/Form";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]); // Стан для списку фільмів
  const [error, setError] = useState(null); // Стан для помилки
  const [query, setQuery] = useState(""); // Стан для запиту пошуку

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await searchMovies(query); // Використовуємо query у виклику API
        setMovies(data); // Оновлюємо список фільмів
      } catch (err) {
        setError(err.message); // Встановлюємо помилку
      }
    };

    if (query) fetchMovies(); // Виконуємо пошук лише якщо є query
  }, [query]); // Запуск useEffect при зміні query

  const handleSearch = (newQuery) => {
    setQuery(newQuery); // Оновлюємо query через функцію
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <MyForm handleSearch={handleSearch} />{" "}
      {/* Передаємо handleSearch у MyForm */}
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
