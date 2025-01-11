import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./MovieCast.module.css";
import { fetchMovieCredits } from "../../services/api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const credits = await fetchMovieCredits(movieId);
        setCast(credits.cast);
      } catch (error) {
        console.error("Error fetching movie cast:", error.message);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li className={s.item} key={actor.id}>
            {actor.name} as {actor.chracter}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
