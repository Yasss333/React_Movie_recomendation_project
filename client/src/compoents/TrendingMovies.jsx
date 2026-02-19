import React from 'react'

const TrendingMovies = ({trendingmovies}) => {
  return (
    <div>
        <ul>
                  {trendingmovies.map((movie, index) => (
                    <li key={movie.$id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} alt={movie.title} />
                    </li>
                  ))}
                </ul>
    </div>
  )
}

export default TrendingMovies