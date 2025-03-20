'use client';
import React from 'react';
import { useState } from 'react';

function Addmovie() {
    const [movie, setMovie] = useState({
        title: '',
    genre: '',
    releaseDate: '',
    rating: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) =>{
    setMovie({...movie, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const res = await fetch('/api/movies', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(movie),
    });
    const data = await res.json();
    alert(data.message);
  }

  return (
    <form 
    onSubmit={handleSubmit} 
    className="flex flex-col gap-4 p-6 max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg"
  >
    <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-300">Add a New Movie</h2>
    
    <input 
      type="text" 
      name="title" 
      placeholder="Title" 
      onChange={handleChange} 
      className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
      required 
    />
    
    <input 
      type="text" 
      name="genre" 
      placeholder="Genre (comma separated)" 
      onChange={handleChange} 
      className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
      required 
    />
    
    <input 
      type="date" 
      name="releaseDate" 
      onChange={handleChange} 
      className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
      required 
    />
    
    <input 
      type="number" 
      name="rating" 
      placeholder="Rating (1-10)" 
      onChange={handleChange} 
      className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
    
    <textarea 
      name="description" 
      placeholder="Description" 
      onChange={handleChange} 
      className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 h-24 focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
    
    <input 
      type="text" 
      name="imageUrl" 
      placeholder="Image URL" 
      onChange={handleChange} 
      className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
  
    <button 
      type="submit" 
      className="bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition duration-200"
    >
      Add Movie
    </button>
  </form>
  
  )
}

export default Addmovie