const express = require('express');
const router = express.Router();
const quranData = require('../data/quran.json');

// GET /api/search?q=
router.get('/', (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  
  if (!query) {
    return res.json({
      results: [],
      pagination: { total: 0, page, limit, totalPages: 0 }
    });
  }

  const results = [];
  
  quranData.forEach(surah => {
    // Check if the query matches the surah name, transliteration, or translation
    const surahMatch = 
      surah.name.toLowerCase().includes(query) ||
      surah.transliteration.toLowerCase().includes(query) ||
      surah.translation.toLowerCase().includes(query);

    if (surahMatch) {
      // If surah name matches, include all ayahs of that surah
      surah.verses.forEach(ayah => {
        results.push({
          surah_id: surah.id,
          surah_name: surah.transliteration,
          ayah_number: ayah.id,
          text: ayah.text,
          translation: ayah.translation,
          match_type: 'surah'
        });
      });
    } else {
      // Otherwise search within ayah translations
      surah.verses.forEach(ayah => {
        if (ayah.translation.toLowerCase().includes(query)) {
          results.push({
            surah_id: surah.id,
            surah_name: surah.transliteration,
            ayah_number: ayah.id,
            text: ayah.text,
            translation: ayah.translation,
            match_type: 'ayah'
          });
        }
      });
    }
  });

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalResults = results.length;
  const paginatedResults = results.slice(startIndex, endIndex);

  res.json({
    results: paginatedResults,
    pagination: {
      total: totalResults,
      page,
      limit,
      totalPages: Math.ceil(totalResults / limit)
    }
  });
});

module.exports = router;
