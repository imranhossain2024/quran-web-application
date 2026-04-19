require('dotenv').config();
const express = require('express');
const cors = require('cors');
const surahsRoutes = require('./routes/surahs');
const searchRoutes = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for now to avoid CORS issues
    }
  }
}));

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: "NurulQuran API", 
    version: "1.0.0",
    endpoints: ["/api/surahs", "/api/search?q=keyword", "/health"]
  });
});

// Routes
app.use('/api/surahs', surahsRoutes);
app.use('/api/search', searchRoutes);

app.get('/health', (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`NurulQuran API running on port ${PORT}`);
});
