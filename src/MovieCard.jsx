import React from "react";
import Movie1 from "/movie1.png";
import Movie2 from "/movie2.png";
import Movie3 from "/movie3.png";
import Movie4 from "/movie4.png";
import Movie5 from "/movie5.png";
import Movie6 from "/movie6.png";
import Movie7 from "/movie7.png";
import Movie8 from "/movie8.png";

const MovieCard = () => {
  const movies = [
    { imageUrl: Movie1 },
    { imageUrl: Movie2 },
    { imageUrl: Movie3 },
    { imageUrl: Movie4 },
    { imageUrl: Movie5 },
    { imageUrl: Movie6 },
  ];

  const continueWatching = [
    { imageUrl: Movie7 },
    { imageUrl: Movie8 },
    { imageUrl: Movie3 },
  ];

  const categories = [
    "All Popular",
    "Action",
    "Animation",
    "Adventure",
    "Horror",
    "Documentary",
    "Romance",
    "Kids",
    "Comedy",
  ];

  return (
    <div className="relative p-6 -mt-27">
      <h3 className="text-2xl font-semibold text-white mb-4 -mt-5">
        Trending Movies
      </h3>
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

      {/* Category Links */}
      <div className="bg-gray-900 text-white py-6 -ml-54">
        <div className="container mx-auto flex justify-center space-x-4">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="border border-gray-500 rounded-full px-4 py-2 bg-gray-500 hover:border-blue-400 hover:text-blue-400 transition-all"
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      {/* Continue Watching Section */}
      <h3 className="text-2xl font-semibold text-white mb-4">
        Continue Watching
      </h3>
      <div className="flex space-x-4 overflow-x-auto">
        {continueWatching.map((movie, index) => (
          <div key={index} className="flex-shrink-0">
            <img
              src={movie.imageUrl}
              alt={`Continue Watching ${index + 1}`}
              className="w-47 h-72 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
