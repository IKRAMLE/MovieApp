import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, Star, Info } from "lucide-react";

const API_URL = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmExZmE5Yjg1YWQ1MzlmMzU4ZmY2NTYzOWE5NDVlOSIsIm5iZiI6MTczOTc0MjQ5OS4wLCJzdWIiOiI2N2IyNWQyMmFhYWMzYjE2NzRlMGNkOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.c9RrKf_7LTqYDxaYIAV-EDdeBlPp_4pkvv_hMomClOE`,
  },
};

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}&page=${page}`, API_OPTIONS);
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const scrollContainer = (direction) => {
    const container = document.getElementById('movies-container');
    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-white">Trending Movies</h3>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full ${currentPage === 1 ? 'bg-gray-700 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Previous
          </button>
          <span className="text-white">Page {currentPage}</span>
          <button 
            onClick={handleNextPage}
            className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>

      <div className="relative group">
        <button
          onClick={() => scrollContainer('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          id="movies-container"
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
        >
          {loading ? (
            <div className="flex items-center justify-center w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            movies.map((movie) => (
              <div 
                key={movie.id} 
                className="flex-shrink-0 relative group cursor-pointer"
                onMouseEnter={() => setSelectedMovie(movie)}
                onMouseLeave={() => setSelectedMovie(null)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-47 h-72 object-cover rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                />
                
                {selectedMovie?.id === movie.id && (
                  <div className="absolute inset-0 bg-black/80 rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between">
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">{movie.title}</h4>
                      <p className="text-white text-sm line-clamp-4">{movie.overview}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400" size={16} />
                        <span className="text-white">{movie.vote_average.toFixed(1)}</span>
                      </div>
                      <span className="text-white text-sm">{movie.release_date?.split('-')[0]}</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <button
          onClick={() => scrollContainer('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MovieCard;