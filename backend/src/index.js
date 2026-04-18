const express = require('express');
const cors = require('cors');
const surahRoutes = require('./routes/surah.route');
// Initialize the Express app
const app = express();

// Middleware
// Enable CORS to allow requests from our Next.js frontend
app.use(cors()); 
// Parse incoming JSON requests automatically
app.use(express.json());

// API Routes
const searchRoutes = require('./routes/search.route');
app.use('/api/surahs', surahRoutes);
app.use('/api/search', searchRoutes);


// Basic Welcome Route (To check if server works)
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the NurulQuran API!",
    status: "success"
  });
});

// Define the port to run the server on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
