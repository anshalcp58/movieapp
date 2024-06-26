const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Use environment port or default to 5000

// Middleware to parse JSON
app.use(express.json());

// Read movies data from movies.json
let movies = [];
const moviesFilePath = path.join(__dirname, 'movies.json');

fs.readFile(moviesFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading movies.json file:', err);
    process.exit(1);
  }
  movies = JSON.parse(data);
});

// Endpoint to get all movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// Endpoint to search movies by title
app.get('/api/movies/search', (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ error: 'Title query parameter is required' });
  }
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(title.toLowerCase())
  );
  res.json(filteredMovies);
});

// Serve a simple HTML page at the root URL
app.get('/', (req, res) => {
  res.json(movies);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
