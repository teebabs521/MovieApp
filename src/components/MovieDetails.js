import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetPopularMovies } from 'services/api'; 

const MovieDetails = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
     
        const movieData = await GetPopularMovies(id);

   
        setMovie(movieData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      <h2 data-testid="movie-title">{movie.title}</h2>
      <p data-testid="movie-release-date"> {movie.release_date}</p>
      <p data-testid="movie-runtime">{movie.runtime}</p>
      <p data-testid="movie-overview">{movie.overview}</p>
    </div>
  );
};

export default MovieDetails;
