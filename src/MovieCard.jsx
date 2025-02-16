import React from "react";
import Movie1 from "/movie1.png";
import Movie2 from "/movie2.png";
import Movie3 from "/movie3.png";
import Movie4 from "/movie4.png";
import Movie5 from "/movie5.png";
import Movie6 from "/movie6.png";

const MovieCard = () => {
  const movies = [
    { imageUrl: Movie1 },
    { imageUrl: Movie2 },
    { imageUrl: Movie3 },
    { imageUrl: Movie4 },
    { imageUrl: Movie5 },
    { imageUrl: Movie6 },
  ];

  return (
    <div className="relative p-6 -mt-27">
      <h3 className="text-2xl font-semibold text-white mb-4 -mt-5">Trending Movies</h3>
      <div className="flex space-x-4 overflow-x-auto">
        {movies.map((movie, index) => (
          <div key={index} className="flex-shrink-0">
            <img
              src={movie.imageUrl}
              alt={`Movie ${index + 1}`}
              className="w-47 h-72 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
