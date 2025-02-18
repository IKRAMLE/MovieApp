const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://ikramlechqer:ikramlechqer@cluster0.owgf0.mongodb.net/Movie?retryWrites=true&w=majority";


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  overview: { type: String, required: true },
  release_date: { type: Date, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

// Get all movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies" });
  }
});

// Add a new movie
app.post("/movies", async (req, res) => {
  const { title, description, imageUrl, overview, release_date } = req.body;

  const newMovie = new Movie({
    title,
    description,
    imageUrl,
    overview,
    release_date,
  });

  try {
    const savedMovie = await newMovie.save();
    res.json(savedMovie); 
  } catch (err) {
    res.status(500).json({ message: "Error adding movie", error: err });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
