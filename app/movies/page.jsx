'use client';
import React from 'react'
import Addmovie from './add/page'
import Link from 'next/link';
import useSWR from 'swr';
import { useState } from 'react';



const fetchMovies = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error fetching movies');
  return response.json();
};

 function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  // Construct the URL with query parameters for search and filtering
  const url = `/api/movies?search=${searchQuery}&genre=${genreFilter}`;

  // Use SWR for fetching movies data
  const { data: movies, error } = useSWR(url, fetchMovies);

  // Handle loading and error states
  if (error) return <div>Error loading movies</div>;
  if (!movies) return <div>Loading...</div>;

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle genre filter change
  const handleGenreFilterChange = (e) => {
    setGenreFilter(e.target.value);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 rounded"
        />
        <select
          value={genreFilter}
          onChange={handleGenreFilterChange}
          className="ml-2 border p-2 rounded"
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          {/* Add more genres here */}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie._id} className="border p-4 rounded-lg shadow-lg">
            <h3 className="font-bold">{movie.title}</h3>
            <p>{movie.genre.join(', ')}</p>
            <p>{movie.releaseDate}</p>
            <p>{movie.rating}</p>
            <p>{movie.description}</p>
            <img src={movie.imageUrl} alt={movie.title} className="w-full h-auto" />
          </div>
        ))}
      </div>
      <Link href="/movies/add" className="text-blue-500 hover:underline">Add a Movie</Link>
    </div>
  )
}


export default MoviesPage