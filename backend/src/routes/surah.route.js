const express = require('express');
const router = express.Router();
// Node.js will automatically read and parse the JSON file for us!
const quranData = require('../data/quran.json');

// Route: Get all Surahs (lightweight list without verses)
router.get('/', (req, res) => {
  try {
    // We use .map() to return only the necessary details, removing the heavy "verses" array
    const surahList = quranData.map(surah => ({
      id: surah.id,
      name: surah.name,
      transliteration: surah.transliteration,
      translation: surah.translation,
      type: surah.type,
      total_verses: surah.total_verses
    }));
    
    // Send the lightweight list to the frontend
    res.status(200).json(surahList);
  } catch (error) {
    console.error("Error loading surahs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: Get a specific Surah by ID (with all its verses)
router.get('/:id', (req, res) => {
  try {
    const surahId = parseInt(req.params.id);
    
    // Find the exact surah from our json data matching the id
    const surah = quranData.find(s => s.id === surahId);
    
    if (!surah) {
      return res.status(404).json({ message: "Surah not found" });
    }
    
    // Send the complete surah data including all verses
    res.status(200).json(surah);
  } catch (error) {
    console.error("Error loading the surah:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
