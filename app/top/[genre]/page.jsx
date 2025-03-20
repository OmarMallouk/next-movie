// Importing React
import React from 'react';

// Fetch function for getting movies based on genre
async function getMovies(genre) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies?genre=${genre}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

// Main function for TopPages, using async to handle data fetching
export default async function TopPages({ params }) {
  // Await for params to be resolved
  const { genre } = await params;

  // If genre doesn't exist, render a loading state
  if (!genre) {
    return <div>Loading...</div>;
  }

  // Fetch movies based on the genre
  const movies = await getMovies(genre);

  // Rendering content
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Top {genre} Movies</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Check if there are movies and render accordingly */}
        {movies.length === 0 ? (
          <div>No movies found for this genre.</div>
        ) : (
          movies.map((movie) => (
            <div key={movie._id} className="bg-white dark:bg-gray-800 p-4 shadow-lg rounded-lg">
              <img src={movie.imageUrl} alt={movie.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{movie.genre.join(", ")}</p>
              <p className="text-sm text-gray-500">⭐ {movie.rating || "N/A"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
