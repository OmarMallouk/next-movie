// File: /app/movie/[id]/page.js

import React from 'react';

const MoviePage = async ({ params }) => {
  const { id } = await params;

  // Fetch movie data from the API using the `id` from the URL
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`);
  const movie = await res.json();

  // Handle case when movie is not found
  if (!movie || res.status === 404) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{movie.title}</h1>
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <p>{movie.description}</p>
      <p>Rating: ⭐ {movie.rating || 'N/A'}</p>
    </div>
  );
};

export default MoviePage;
