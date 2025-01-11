import React from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import { useState, useEffect } from "react";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  if (!reviews) {
    return null;
  }

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(({ id, author, content }) => (
          <li className={s.item} key={id}>
            <h3>Author: {author}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
      : (<p>No reviews available for this movie.</p>)
    </div>
  );
};

export default MovieReviews;
