import React from "react";

const Moviecard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="movie-card">
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : '/no-image.png'}  />
        <div className="mt-4">
      <h3 className="text-amber-100  font-medium ">{title}</h3>
            <div className="content">
            <div className="rating">
                <img src="star.svg"   alt="star-image"/>
                <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                <span className="text-3xl px-2 flex  mt-0.5 items-center justify-center">·</span>
                 <p className="lang">{original_language}</p>
                <span className="text-3xl px-2 flex  mt-0.5 items-center justify-center">·</span>
                 <p className="year">{  release_date ? release_date.split('-')[0] : "N/A"}</p>
            </div>
            </div>
        </div>
    </div>
  );
};

export default Moviecard;
