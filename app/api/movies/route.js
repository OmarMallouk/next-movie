import { NextResponse } from 'next/server';
import {connect} from '../../lib/mongodb/mongoose';
import Movies from '../../lib/models/movies.model';


export async function GET(req) {
  await connect();
  const url = new URL(req.url);
  const searchQuery = url.searchParams.get('search') || '';
  const genreFilter = url.searchParams.get('genre') || '';

  try {

    const filter = {};

    if (searchQuery) {
      filter.title = { $regex: searchQuery, $options: 'i' }; // Case-insensitive search
    }

    // Add genre filter if present
    if (genreFilter) {
      filter.genre = { $in: [genreFilter] }; // Match genre
    }

    const movies = await Movies.find(filter);
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching movies', error }, { status: 500 });
  }
}


export async function POST(req) {
  await connect();
  try {
    const { title, genre, releaseDate, rating, description, imageUrl } = await req.json();

    if (!title || !genre || !releaseDate) {
      return NextResponse.json({ message: 'Title, genre, and releaseDate are required' }, { status: 400 });
    }

    const newMovie = new Movies({
      title,
      genre,
      releaseDate: new Date(releaseDate),
      rating,
      description,
      imageUrl
    });

    await newMovie.save();
    return NextResponse.json({ message: 'Movie added successfully', movie: newMovie }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding movie', error }, { status: 500 });
  }
}
