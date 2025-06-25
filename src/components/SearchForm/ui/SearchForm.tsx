import { useThrottle } from "../../../../customhooks";
import { useState, FormEvent, useEffect, useTransition } from "react";
import { Button, Form, Input, Skeleton, Image } from "@heroui/react";
import { getMovies } from "../../../../getmovies";
import { Link } from "react-router";
import axios from "axios";
import { ScrollToTopButton } from "../../UpButton";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export function SearchForm() {
  const [userInput, setUserinput] = useState("death");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isLoading, startLoading] = useTransition();
  const fetchData = (
    searchQuery: string,
    page: number,
    signal: AbortController['signal'],
  ) => {
    startLoading(async () => {
      setError(null);
      const shouldAppend = page > 1;
      try {
        const m = await getMovies(searchQuery, page, signal);
        setMovies((movies) => (shouldAppend ? [...movies, ...m] : m));
      } catch (err) {
        if (axios.isCancel(err)) return;
        if (!shouldAppend) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred",
          );
        }
      }
    })

  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(userInput, page, controller.signal);
    return () => controller.abort();
  }, [userInput, page]);

  const loadMoreOnScroll = useThrottle(
    () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 1450;
      if (bottom && !isLoading && userInput) {
        setPage((prevPage) => {
          const nextPage = prevPage + 1;
          // fetchData(userInput, nextPage, true);
          return nextPage;
        });
      }
    },
    300,
  );

  useEffect(() => {
    window.addEventListener("scroll", loadMoreOnScroll);
    return () => {
      window.removeEventListener("scroll", loadMoreOnScroll);
     
    };
  }, [userInput, isLoading]);

  const onNewSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (
      new FormData(e.currentTarget).get("search") as string
    ).trim();
    setPage(1);
    setUserinput(inputValue);
    // fetchData(inputValue, 1, false);
  };

  return (
    <div>
       <ScrollToTopButton />
      <div className="">
        <Form
          className="flex flex-row gap-0 justify-center"
          onSubmit={onNewSearch}
        >
          <Input
            validate={(value) => {
              if (value.length === 0) {
                return "This field must be filled in";
              }
              if (value.match(/[^A-Za-z0-9\s\-!?.,]/)) {
                return "Only English is supported";
              }
              return null;
            }}
            isRequired
            placeholder="Search for a movie"
            name="search"
            type="text"
            onValueChange={setUserinput}
            classNames={{
              inputWrapper: "rounded-r-none",
              input: "lg:text-lg/7 text-2xl",
            }}
            className="w-[65%] mt-2  mr-0  lg:text-lg/7 text-2xl"
          />
          <Button
            color="primary"
            disabled={isLoading}
            type="submit"
            className="mt-2 ml-0 w-30 lg:text-lg/7 text-2xl rounded-l-none"
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </Form>
      </div>

      {error ? (
        <h1 className={"pl-215 pt-20  text-red-500 text-5xl"}>{error}</h1>
      ) : (
        <div className={" flex flex-col items-center"}>
          {movies.length > 0 &&
            movies.map((movie) => (
              <div key={movie.imdbID} className="flex flex-col items-center">
                <Link to={`/movies/${movie.imdbID}`}>
                  {movie.Poster !== "N/A" && (
                    <Image
                      src={movie.Poster}
                      alt={movie.Title}
                      className="mb-5 mt-10 z-0"
                      height={450}
                      width={300}
                    />
                  )}
                  <div className="flex flex-col items-center">
                    <h3 className="mb-2 font-semibold lg:text-lg/7 text-2xl">
                      {movie.Title}
                    </h3>
                    <p className="mb-2 lg:text-lg/7 text-2xl">
                      Year: {movie.Year}
                    </p>
                    <p className="mb-2 lg:text-lg/7 text-2xl">
                      Type: {movie.Type}
                    </p>
                  </div>
                </Link>
              </div>
            ))}

          {isLoading &&
            [...Array(movies.length === 0 ? 10 : 5)].map((_, index) => (
              <div key={`skeleton-${index}`} className="">
                <Skeleton className="h-[450px] mb-5 mt-10 w-[300px]" />
                <Skeleton className="h-6 mb-2 w-[300px]" />
                <Skeleton className="h-6 mb-2 w-[300px]" />
                <Skeleton className="h-6 mb-2 w-[300px]" />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
