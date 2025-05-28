import { useState, FormEvent, useEffect } from 'react';
import {Button, Form, Input, Skeleton} from "@heroui/react";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface ApiResponse {
  Search?: Movie[];
  Response: string;
  Error?: string;
}

export  function SearchForm() {

  const [userInput, setUserinput] = useState("death")
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
 

  const fetchData = async (searchQuery: string, page: number, shouldAppend: boolean = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchQuery}&page=${page}&apikey=b607348f`, 
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: ApiResponse = await response.json();
      console.log(data);
      if (data.Response === 'False') {
        throw new Error(data.Error || 'No movies found');
      }

      if (!data.Search) {
        throw new Error('Invalid API response format');
      }

      setMovies( shouldAppend ? [...movies, ...data.Search!] : data.Search!);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      fetchData(userInput, 1, false);
  }, []);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 1450;
    if (bottom && !isLoading && userInput) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchData(userInput, nextPage, true);
        return nextPage;
      });
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [userInput, isLoading]);

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (new FormData(e.currentTarget).get('search') as string).trim();
    setPage(1);
    setUserinput(inputValue);
    fetchData(inputValue, 1, false);
  };


  return (
    <div>
      <div className=''>
      <Form  className="flex flex-row gap-0" onSubmit={onFormSubmit}>
          <Input
           validate={(value) => {
            if (value.length === 0) {
              return "111"; // Пустая строка → ошибка "111"
            }
            if (value.match(/[^A-Za-z0-9\s\-!?.,]/)) { // Убрал ^ и $, проверяем любой запрещенный символ
              return "Only English is supported"; // Есть неанглийские символы → ошибка
            }
            return null; // Валидация пройдена
          }}
            isRequired
            placeholder="Search for a movie"
            name="search"
            type="text"
            onValueChange={setUserinput}
            classNames={{
              inputWrapper: "rounded-r-none",
              input: "text-lg/7"
            }}
            className="w-7xl mt-[6px] ml-[301px] mr-0 h-[30px] text-lg/7"
          />
          <Button  
            color='primary'
            disabled={isLoading}
            type="submit"
            className="mt-[6px] ml-0 w-30 text-lg/7 rounded-l-none"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
      </Form>
      </div>

      {error ? <h1 className={"pl-215 pt-20  text-red-500 text-5xl"}>{error}</h1> :
      <div className={"pl-200 pt-0"}>
        {movies.length > 0 && movies.map((movie) => (
          <div key={movie.imdbID} className="">
            {movie.Poster !== 'N/A' && (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="mb-5 mt-10"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div>
              <h3 className=" mb-2 font-semibold">{movie.Title}</h3>
              <p className='mb-2'>Year: {movie.Year}</p>
              <p className='mb-2'>Type: {movie.Type}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          [...Array(movies.length === 0 ? 10 : 5)].map((_, index) => (
            <div key={`skeleton-${index}`} className="">
              <Skeleton 
                className="h-[450px] mb-5 mt-10 w-[300px]" 
              />
              <Skeleton className="h-[24px] mb-2 w-[300px]" />
              <Skeleton className="h-[24px] mb-2 w-[300px]" />
              <Skeleton className="h-[24px] mb-2 w-[300px]" />
            </div>
          ))
        )}
      </div>}


    </div>
  );
}