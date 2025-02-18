import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

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
    setMovies([...movies, data]);
    setShowForm(false); // Hide form after submission
    setNewMovie({
      title: "",
      description: "",
      imageUrl: "",
      overview: "",
      release_date: "",
    });
  };

  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <div key={movie._id} className="movie-card">
          <img src={movie.imageUrl} alt={movie.title} />
          <h3>{movie.title}</h3>
        </div>
      ))}
      

      {/* Add New Movie Button */}
      {!showForm && (
        <div
          className="flex justify-center mt-33"
          onClick={() => setShowForm(true)}
        >
          <FaPlus className="plus-icon" size={24} />
        </div>
      )}

      {/* Inline Form */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Movie Title"
            value={newMovie.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newMovie.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image Path"
            value={newMovie.imageUrl}
            onChange={handleChange}
            required
          />
          <textarea
            name="overview"
            placeholder="Overview"
            value={newMovie.overview}
            onChange={handleChange}
            required
          ></textarea>
          <input
            type="date"
            name="release_date"
            value={newMovie.release_date}
            onChange={handleChange}
            required
          />
          <div className="mt-15 flex justify-between">
            <button type="submit" className="border rounded-[9px] px-4 py-2">
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border rounded-[9px] px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MoviesAdd;
