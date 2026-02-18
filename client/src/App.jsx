import React, { useEffect, useState } from 'react'
import Search from './compoents/Search'
import Spinner from './compoents/Spinner';
import Moviecard from './compoents/Moviecard';
import {useDebounce}  from 'react-use';


const API_BASE_URL="https://api.themoviedb.org/3"

const API_KEY=import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS={
  method:"GET",
  headers:{
    accept:"application/json",
    Authorization:`Bearer ${API_KEY}`
  }
}



const App = () => {
  const[searchTerm, setSearchTerm]=useState("");
  const[errroMessage, setErrorMessage]=useState("");
  const[movielist , setmovielist]=useState([])
  const[isLoading , setisLoading]=useState(false )
  const [de]

  const fetchMovies=async(query='')=>{
    setisLoading(true);
    setErrorMessage('')
    try {
      const endpoint=query ?
       ` ${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response=await fetch(endpoint,API_OPTIONS)

      if(!response.ok){
        throw new Error("Failed oto get data");
        
      }
      let data=await response.json();
      // console.log(data);
      
      // alert(response)
      //  if(data.response==="false"){
      //   setErrorMessage(data.Error|| "Failed to fetch movies ");
      //   setmovielist([])
      //  return;
      // } 

      setmovielist(data.results || []) 
    } catch (error) {
      console.log(`Error fething the movies :${error}`);
      setErrorMessage("Failed to fetch message , Pls try later . ")
    }
    finally{
      setisLoading(false)
    }
  }

    useEffect(()=>{
      fetchMovies(searchTerm)
    },[searchTerm])

  return (
    <main>
      <div className='pattern'>
          <div className='wrapper'>
            <header>
              <img src="./hero.png" alt="Herro banner" />
            <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle </h1>
            <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

          <section className='all-movies'>
              <h2 className='mt-[40px]' >All Movies</h2> 
          {isLoading ? (
            <p className='text-white'><Spinner/> Loading ...</p>
          ) : errroMessage ? (
            <p className='text-red-500'>{errroMessage}</p>
          )  : (
            <ul>
              {movielist.map((movie)=>(
               <li >
                 <Moviecard key={movie.id} movie={movie} /> 
               </li>
              ))}
            </ul>
          )}

          </section>

          </div>
      </div>
    </main>
  )
}

export default App