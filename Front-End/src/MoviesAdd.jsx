import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

const MoviesAdd = () => {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    imageUrl: "",
    overview: "",
    release_date: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    });
    const data = await res.json();
    setMovies([data, ...movies]); 
    setShowForm(false);
    setNewMovie({
      title: "",
      description: "",
      imageUrl: "",
      overview: "",
      release_date: "",
    });
  };

  return (
    <div className="p-7">
      <div className="flex flex-row flex-wrap gap-6">
        {/* Movie Cards */}
        {movies.map((movie) => (
          <div key={movie._id} className="relative group w-45">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-48 h-72 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-white font-semibold text-lg truncate">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}

        {/* Adding movies Card */}
        <div
          onClick={() => setShowForm(true)}
          className="w-45 h-72 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
        >
          <Plus className="w-8 h-8 text-gray-400" />
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Movie Title"
                value={newMovie.title}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={newMovie.description}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image Path"
                value={newMovie.imageUrl}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <textarea
                name="overview"
                placeholder="Overview"
                value={newMovie.overview}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white h-24"
              ></textarea>
              <input
                type="date"
                name="release_date"
                value={newMovie.release_date}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                >
                  Add Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesAdd;
