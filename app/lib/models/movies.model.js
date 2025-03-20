import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: String,
  genre: [String],
  releaseDate: Date,
  rating: Number,
  description: String,
  imageUrl: String,
});

const Movies =  mongoose.models.Movies || mongoose.model('Movies', movieSchema);
export default Movies;