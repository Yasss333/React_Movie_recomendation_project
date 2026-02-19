import React, { useEffect, useState } from "react";
import Search from "./compoents/Search";
import Spinner from "./compoents/Spinner";
import Moviecard from "./compoents/Moviecard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updatecounter } from "./appwrite";
import { Databases } from "appwrite";
import TrendingMovies from "./compoents/TrendingMovies";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const metric = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const App = () => {
  const [debouncedSearchTerm, setDebounceSearchTerm] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [errroMessage, setErrorMessage] = useState("");
  const [movielist, setmovielist] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [topRatedisLoading, setTopisRatedisLoading] = useState(false);
  const [trendingmovies, setTrendingMovies] = useState([]);
  const[page, setPage]=useState(1);
  const[hasMore , sethasMore]=useState(true);


  useDebounce(() => setDebounceSearchTerm(searchTerm), 600, [searchTerm]);

  useEffect(() => {
    setPage(1);
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadtrendingmovies();
  }, []);

const loadMoreMovies = () => {
  const nextPage = page + 1;
  setPage(nextPage);
  fetchMovies(debouncedSearchTerm, nextPage);
};


  const fetchMovies = async (query = "",pageNUm=1) => {
    setisLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed oto get data");
      }
      let data = await response.json();
      // console.log(data);

      // alert(response)
      //  if(data.response==="false"){
      //   setErrorMessage(data.Error|| "Failed to fetch movies ");
      //   setmovielist([])
      //  return;
      // }

      // setmovielist(data.results || []);
      setmovielist(prev=> pageNUm===1 ? data.results : [...prev,...data.results])
        sethasMore(pageNUm <data.total_pages)

      if (query && pageNUm===1 && data.results.length > 0) {
        await updatecounter(query, data.results[0]);
      }
    } catch (error) {
      console.log(`Error fething the movies :${error}`);
      setErrorMessage("Failed to fetch message , Pls try later . ");
    } finally {
      setisLoading(false);
    }
  };

  const loadtrendingmovies = async () => {
    setTopisRatedisLoading(true);
    setErrorMessage("");
    try {
      const movie = await getTrendingMovies();
      setTrendingMovies(movie);
      if (!trendingmovies) {
        console.log("Emoty use state trending movies ");
      }
    } catch (error) {
      console.log(`Error loading trending movies ${error}`);
      setErrorMessage("Error fetching trending movies");
    } finally {
      setTopisRatedisLoading(false);
    }
  };

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Herro banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without the Hassle{" "}
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {/* <h2>ddd</h2> */}

          {trendingmovies.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>
              {topRatedisLoading ? (
                <div className="text-white">
                  <Spinner />
                </div>
              ) : errroMessage ? (
                <p className="text-red-500">{errroMessage}</p>
              ) : (
                <TrendingMovies  trendingmovies={trendingmovies}/>
        
              )}
            </section>
          )}
          <section className="all-movies">
            <h2>All Movies</h2>
            {isLoading ? (
              <div className="text-white">
                <Spinner /> Ruko bhai ...
              </div>
            ) : errroMessage ? (
              <p className="text-red-500">{errroMessage}</p>
            ) : (
              <ul>
                {movielist.map((movie) => (
                  <li key={movie.id}>
                    <Moviecard movie={movie} />
                  </li>
                ))}
              </ul>
            )}
          </section>
          {hasMore && !isLoading && (
            <div className="flex justify-center mt-6">
              <button onClick={loadMoreMovies}
              className="px-6 py-2 rounded-lg bg-indigo-400 hover:bg-indigo-600"
              > Load more</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
