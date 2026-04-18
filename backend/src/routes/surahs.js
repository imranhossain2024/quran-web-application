const express = require('express');
const router = express.Router();
const quranData = require('../data/quran.json');

// GET /api/surahs
router.get('/', (req, res) => {
  const surahs = quranData.map(surah => ({
    id: surah.id,
    name: surah.name,
    transliteration: surah.transliteration,
    translation: surah.translation,
    type: surah.type,
    total_verses: surah.total_verses
  }));
  res.json(surahs);
});

// GET /api/surahs/:id/ayahs
router.get('/:id/ayahs', (req, res) => {
  const surahId = parseInt(req.params.id);
  const surah = quranData.find(s => s.id === surahId);
  
  if (!surah) {
    return res.status(404).json({ error: 'Surah not found' });
  }
  
  res.json(surah);
});

module.exports = router;
