import React, { useEffect, useState } from 'react'
import Search from './compoents/Search'

const API_BASE_URL="https://api.themoviedb.org/3"

const API_KEY=import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS={
  method:"GET",
  header:{
    accept:"application/json",
    Authorization:`B earer ${API_KEY}`
  }
}



const App = () => {
  const[searchTerm, setSearchTerm]=useState("");
  const[errroMessage, setErrorMessage]=useState("");

  const fetchMovies=async()=>{
    try {
      const endpoint=`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      
    } catch (error) {
      console.log(`Error fething the movies :${error}`);
      setErrorMessage("Failed to fetch message , Pls try later . ")
    }
  }

    useEffect(()=>{

    },[])

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
              <h2>All Movies</h2>
              {errroMessage && <p className='text-red-400'> {errroMessage}</p>}
          </section>

          </div>
      </div>
    </main>
  )
}

export default App