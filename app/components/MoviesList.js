import { useEffect, useState } from 'react';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {movies.map(movie => (
        <div key={movie._id}>
          <h2>{movie.title}</h2>
          <p>{movie.genre.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
