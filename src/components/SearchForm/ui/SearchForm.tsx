import styles from './SearchForm.module.css';
import { useState, FormEvent, useEffect, useTransition } from 'react';

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

  const [userInput, setUserinput] = useState("")
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, startLoading] = useTransition();
 

  const fetchData = (searchQuery:string, page:number) => {
    startLoading(async () => {
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
  
        setMovies(data.Search);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    })

  };

  // const handleScroll = () => {
  //   const bottom =
  //     Math.ceil(window.innerHeight + window.scrollY) >=
  //     document.documentElement.scrollHeight - 200;
  //   if (bottom) {
  //     setPage((prevPage) => {
  //       const nextPage = prevPage + 1;
  //       fetchData(userInput, nextPage);
  //       return nextPage;
  //     });
  //   }
  // };
  
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(()=> {
    fetchData("death", 1)
  }, [])

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // const form = e.currentTarget;
    // const input = form.elements.namedItem('search') as HTMLInputElement;
    // const inputValue = input.value.trim();

    const inputValue = (new FormData(e.currentTarget).get('search') as string).trim();
    
    if (!inputValue) {
      setError('Please enter a search term');
      return;
    }

    fetchData(inputValue, 1)
  };

 

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div className={styles.wrapper}>
          <input
            className={styles.input}
            placeholder="Search for a movie"
            name="search"
            type="text"
          />
          <button 
            className={styles.submit} 
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.results}>
        {movies.map((movie) => (
          <div key={movie.imdbID} className={styles.movie}>
            {movie.Poster !== 'N/A' && (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className={styles.poster}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div className={styles.info}>
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}