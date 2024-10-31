// routes/occupations.js
const express = require('express');
const router = express.Router();

// Import the occupationsList controller function
const { occupationsList } = require('../controllers/occupationsController');

// Route: GET /api/v1/occupations
router.get('/', occupationsList);

module.exports = router;
