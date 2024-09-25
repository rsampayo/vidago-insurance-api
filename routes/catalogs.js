// routes/catalogs.js
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getOccupationsList,
  getCatalogs,
  getPlans,
  getLocationByPostalCode,
} = require('../controllers/catalogsController');

// Route: GET /getOccupations
router.get('/getOccupations', getOccupationsList);

// Route: GET /getCatalogs
router.get('/getCatalogs', getCatalogs);

// Route: GET /getPlans
router.get('/getPlans', getPlans);

// Route: GET /postalCodes/{postalCode}
router.get('/postalCodes/:postalCode', getLocationByPostalCode);

module.exports = router;
