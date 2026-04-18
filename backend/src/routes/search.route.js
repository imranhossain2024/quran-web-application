const express = require('express');
const router = express.Router();
const quranData = require('../data/quran.json');

// Route: Search ayahs by translation text
router.get('/', (req, res) => {
  try {
    const query = req.query.q;
    
    // Check if the user provided a search word and that it is a valid string
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: "Search query 'q' is required and must be a string." });
    }

    const searchKeyword = query.toLowerCase();
    const results = [];

    // Search through all surahs and verses
    quranData.forEach(surah => {
      surah.verses.forEach(verse => {
        // If the English translation contains the keyword
        if (verse.translation.toLowerCase().includes(searchKeyword)) {
          results.push({
            surahId: surah.id,
            surahName: surah.name,
            surahTransliteration: surah.transliteration,
            verseId: verse.id,
            text: verse.text,               // Arabic text
            translation: verse.translation  // English translation matching
          });
        }
      });
    });

    res.status(200).json({
      query: query,
      totalResults: results.length,
      results: results
    });

  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
