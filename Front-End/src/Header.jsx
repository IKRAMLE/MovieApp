import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  Compass,
  TrendingUp,
  User,
  Heart,
  Calendar,
  ChevronDown,
  LogOut,
  Star,
} from "lucide-react";
import logo from "/logo.png";
import Ikram from "/Profile.png";
import Maria from "/1st.png";
import Hafsa from "/2nd.png";
import Salma from "/3rd.png";
import Xa from "/4th.png";
import HeroSection from "./HeroSection.jsx";
import Add from "./MoviesAdd.jsx";

// API Configuration
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmExZmE5Yjg1YWQ1MzlmMzU4ZmY2NTYzOWE5NDVlOSIsIm5iZiI6MTczOTc0MjQ5OS4wLCJzdWIiOiI2N2IyNWQyMmFhYWMzYjE2NzRlMGNkOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.c9RrKf_7LTqYDxaYIAV-EDdeBlPp_4pkvv_hMomClOE`,
  },
};

const MenuItem = ({ icon: Icon, text, active, onClick }) => (
  <div
    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer group transition-all duration-200
      ${active ? "bg-gray-700" : "hover:bg-gray-700"}`}
    onClick={onClick}
  >
    <Icon
      size={20}
      className={`transition-colors duration-200 ${
        active ? "text-blue-400" : "text-gray-400 group-hover:text-blue-400"
      }`}
    />
    <span
      className={`transition-colors duration-200 ${
        active ? "text-blue-400" : "group-hover:text-blue-400"
      }`}
    >
      {text}
    </span>
  </div>
);

const FollowingItem = ({ name, image }) => (
  <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-8 h-8 rounded-full object-cover"
      />
    </div>
    <span className="text-sm">{name}</span>
  </div>
);

const MovieGrid = ({
  movies,
  loading,
  currentPage,
  handlePrevPage,
  handleNextPage,
}) => (
  <div>
    <h3 className="text-2xl font-semibold text-white px-6">Movies</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6">
      {loading ? (
        <div className="col-span-full flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : (
        movies.map((movie) => (
          <div key={movie.id} className="relative group cursor-pointer">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/80 rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between">
              <div>
                <h4 className="text-white font-semibold text-lg mb-2">
                  {movie.title}
                </h4>
                <p className="text-white text-sm line-clamp-4">
                  {movie.overview}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400" size={16} />
                  <span className="text-white">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <span className="text-white text-sm">
                  {movie.release_date?.split("-")[0]}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
      <Add />
    </div>
    <div className="flex items-center justify-center space-x-4 pb-6">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-full ${
          currentPage === 1
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
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
);

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("Browser");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const menuItems = [
    { icon: Compass, text: "Browser" },
    { icon: TrendingUp, text: "Trending" },
    { icon: User, text: "Following" },
    { icon: Heart, text: "Watchlist" },
    { icon: Calendar, text: "Coming Soon" },
  ];

  const followingUsers = [
    { name: "IkramLE", image: Ikram },
    { name: "MariaLh", image: Maria },
    { name: "HafsaBen", image: Hafsa },
    { name: "SalmaSA", image: Salma },
    { name: "Xa.na26", image: Xa },
  ];

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = searchQuery
          ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&page=${currentPage}`
          : `${API_URL}&page=${currentPage}`;
        const response = await fetch(url, API_OPTIONS);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchMovies, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, currentPage]);

  const handleMenuClick = (text) => {
    setActiveMenuItem(text);
  };

  return (
    <div className="min-h-screen text-white bg-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800 bg-gray-800 fixed top-0 left-0 w-full text-white p-4 shadow-md z-50">
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <div className="w-40 h-12 flex items-center justify-center">
              <img src={logo} alt="CineVibe" className="h-22" />
            </div>
          </div>
          <button
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="bg-gray-900 rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Bell
            size={24}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
          <div className="w-8 h-8 bg-gray-600 rounded-full overflow-hidden">
            <img
              src={Ikram}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`
            transform transition-transform duration-300 ease-in-out z-40 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            fixed left-0 top-[73px] h-[calc(100vh-73px)]
          `}
        >
          <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
            <nav className="flex-1 flex flex-col p-4 space-y-6 overflow-y-auto scrollbar-hide">
              <div>
                <h3 className="text-lg font-semibold mb-4">News Feed</h3>
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.text}
                      icon={item.icon}
                      text={item.text}
                      active={activeMenuItem === item.text}
                      onClick={() => handleMenuClick(item.text)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Following</h3>
                <div className="space-y-2">
                  {followingUsers.map((user) => (
                    <FollowingItem
                      key={user.name}
                      name={user.name}
                      image={user.image}
                    />
                  ))}
                  <button className="flex items-center space-x-2 p-2 text-gray-400 hover:text-blue-400 w-full">
                    <ChevronDown size={16} />
                    <span className="text-sm">Load more</span>
                  </button>
                </div>
              </div>
            </nav>

            <div className="p-4 border-t border-gray-700">
              <button className="flex items-center space-x-4 text-red-400 hover:text-red-600 hover:bg-gray-700 p-2 rounded-lg w-full">
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
              <div className="text-sm">&copy; 2025 CineVibe</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <HeroSection />
          <MovieGrid
            movies={movies}
            loading={loading}
            currentPage={currentPage}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
