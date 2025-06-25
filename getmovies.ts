import axios from "axios";


type ApiResponse = {
  Search: Movie[];
  Response: 'True';
} | {
  Response: 'False';
  Error: string;
}

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export async function getMovies(
  searchQuery: string,
  page: number,
  signal?: AbortController['signal']
):Promise<Movie[]> {
  const url = `https://www.omdbapi.com/?s=${searchQuery}&page=${page}&apikey=${import.meta.env.VITE_API_KEY}`;
  const { data } = await axios.get<ApiResponse>(url, {signal});
  if (data.Response === "False") {
    throw new Error(data.Error)
  }


  // throw Er
  return data.Search;
  
}
