import React from 'react';
import MovieCard from "./MovieCard";
import Movie1 from '/movie1.png';
import Movie2 from '/movie2.png';
import Movie3 from '/movie3.png';
import Movie4 from '/movie4.png';
import Movie5 from '/movie5.png';
import Movie6 from '/movie6.png';

const MovieCardGrid = () => {
  const movies = [
    { imageUrl: Movie1 },
    { imageUrl: Movie2 },
    { imageUrl: Movie3 },
    { imageUrl: Movie4 },
    { imageUrl: Movie5 },
    { imageUrl: Movie6 },
  ];
  return (
    <div className="flex space-x-4 overflow-x-auto p-6">
      {movies.map((movie, index) => (
        <img
          key={index}
          src={movie.imageUrl}
          alt={`Movie ${index + 1}`}
          className="w-47 h-70 object-cover rounded-lg"
        />
      ))}
    </div>
  );
};

export default MovieCardGrid;
