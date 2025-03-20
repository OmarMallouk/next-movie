import Link from "next/link";

interface Movie {
  _id: string;
  title: string;
  genre: string[];
  releaseDate: string;
  rating: number;
  description: string;
  imageUrl: string;
}

async function getMovies(): Promise<Movie[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`, {
    cache: "no-store", // Ensures fresh data
  });
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export default async function Home() {
  const movies = await getMovies();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Movies</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-white dark:bg-gray-800 p-4 shadow-lg rounded-lg">
            <img src={movie.imageUrl} alt={movie.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{movie.genre.join(", ")}</p>
            <p className="text-sm text-gray-500">⭐ {movie.rating || "N/A"}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link href="/add-movie" className="bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition">
          Add Movie
        </Link>
      </div>
    </div>
  );
}