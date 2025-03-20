import Results from '../../components/Result';

export default async function SearchPage({ params }) {
  const { searchTerm } = params;

  console.log("Search Term:", searchTerm); // Debugging

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/movies?search=${searchTerm}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }

  const data = await res.json();
  
  console.log("Fetched Data:", data); // Debugging

  return (
    <div>
      {data.length === 0 ? (
        <h1 className="text-center pt-6">No results found</h1>
      ) : (
        <Results results={data} />
      )}
    </div>
  );
}
