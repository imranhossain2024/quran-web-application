require('dotenv').config();
const express = require('express');
const cors = require('cors');
const surahsRoutes = require('./routes/surahs');
const searchRoutes = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

app.use(express.json());

// Routes
app.use('/api/surahs', surahsRoutes);
app.use('/api/search', searchRoutes);

app.get('/health', (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`NurulQuran API running on port ${PORT}`);
});
