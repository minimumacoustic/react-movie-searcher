import axios from "axios";

export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  totalSeasons: string;
  Response: "True";
}

type ApiResponse = Movie | {
  Response: "False";
  Error: "string";
}

interface Rating { Source: string;  Value: string}

export async function getFilmByID(url:string) {
  const { data } = await axios.get<ApiResponse>(url);
  return data;
}
