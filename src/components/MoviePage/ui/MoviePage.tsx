import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getFilmByID, Movie } from "../../../../getfilmbyid";
import { ErrorMessage } from "../../Error/ui/Error";
import { Loader } from "../../Loader/ui/Loader";


export function MoviesPage() {
  const [film, setFilm] = useState<Movie | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${import.meta.env.VITE_API_KEY}`;

  useEffect(() => {
    async function fetchFilm() {
      try {
        const data = await getFilmByID(url);
        if (data.Response === "False") {
          throw Error(data.Error);
        }
        setFilm(data);
      } catch (e) {
        setErrorMessage((e as Error).message || "Something wrong");
      }
    }
    fetchFilm();
  }, []);

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

   if (film === null) {
    return <Loader/>
  }



  return (
    <>
      <div className="flex items-center flex-col">
        <img
          className="h-[450px] mb-6 lg:mt-3 mt-13 w-[300px]"
          src={film.Poster}
          alt={`Poster of ${film.Title}`}
        />
      </div>
      <div
        className={
          "ml-10 lg:grid lg:grid-cols-3 lg:grid-rows-3 flex flex-col items-center gap-2.5 lg:gap-x-108 lg:gap-y-1"
        }
      >
        <div>
          <strong>Title:</strong> {film.Title}
        </div>
        <div>
          <strong>Year:</strong> {film.Year}
        </div>
        <div>
          <strong>Rated:</strong> {film.Rated}
        </div>
        <div>
          <strong>Released:</strong> {film.Released}
        </div>
        <div>
          <strong>Runtime:</strong> {film.Runtime}
        </div>
        <div>
          <strong>Genre:</strong> {film.Genre}
        </div>
        <div>
          <strong>Director:</strong> {film.Director}
        </div>
        <div>
          <strong>Writer:</strong> {film.Writer}
        </div>
        <div>
          <strong>Actors:</strong> {film.Actors}
        </div>

        <div>
          <strong>Language:</strong> {film.Language}
        </div>
        <div className="">
          <strong>Plot:</strong>{" "}
          <span className="w-90 text-center">{film.Plot} </span>
        </div>
        <div>
          <strong>Country:</strong> {film.Country}
        </div>
        <div>
          <strong>Awards:</strong> {film.Awards}
        </div>
        <div>
          <strong>Ratings:</strong>
          {film.Ratings?.length ? (
            film.Ratings.map((rating, index) => (
              <span key={index}>
                <strong className="ml-3">{rating.Source}:</strong>{" "}
                {rating.Value}
              </span>
            ))
          ) : (
            <div>
              <strong>No ratings available</strong>
            </div>
          )}
        </div>
        <div>
          <strong>IMDb Votes:</strong> {film.imdbVotes}
        </div>
        <div>
          <strong>IMDb ID:</strong> {film.imdbID}
        </div>
        <div>
          <strong>Type:</strong> {film.Type}
        </div>
      </div>
    </>
  );
}
