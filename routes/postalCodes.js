// routes/postalCodes.js
const express = require('express');
const router = express.Router();

// Import controller functions
const { getLocationByPostalCode } = require('../controllers/postalCodeController');

// Route: GET /api/v1/postalCodes/:postal_code
router.get('/:postal_code', getLocationByPostalCode);

module.exports = router;
