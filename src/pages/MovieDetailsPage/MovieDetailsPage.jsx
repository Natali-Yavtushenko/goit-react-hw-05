import { useParams, Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../services/api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details.");
        console.error(err);
      }
    };

    if (movieId) {
      fetchDetails();
    } else {
      setError("Movie ID is missing.");
    }
  }, [movieId]);

  if (error) return <p>{error}</p>;

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={s.container}>
      <div className={s.detailsContainer}>
        <Link to="/">Go back</Link>
        <img
          className={s.img}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
        />
        <div className={s.details}>
          <h1 className={s.title}>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h1>
          <h4>Overview</h4>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <nav>
        <h3>Additional information</h3>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
