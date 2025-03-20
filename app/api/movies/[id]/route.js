// File: /app/api/movies/[id]/route.js
import Movies from '../../../lib/models/movies.model';


export async function GET(req, { params }) {
  const { id } = await params; // Get the movie ID from the URL

  try {
    const movie = await Movies.findById(id); // Fetch the movie by ID

    if (movie) {
      return new Response(JSON.stringify(movie), { status: 200 }); // Return the movie data if found
    } else {
      return new Response(JSON.stringify({ error: 'Movie not found' }), { status: 404 }); // Movie not found
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 }); // Handle errors
  }
}
