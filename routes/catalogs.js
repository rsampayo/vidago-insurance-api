// routes/catalogs.js
const express = require('express');
const router = express.Router();

// Import controller functions
const { catalogs } = require('../controllers/catalogController');

// Route: GET /api/v1/catalogs?catalog_type=...
router.get('/', catalogs);

module.exports = router;
