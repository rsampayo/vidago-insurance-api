// routes/plans.js
const express = require('express');
const router = express.Router();

// Import the Plans controller function
const { Plans } = require('../controllers/plansController');

// Route: GET /api/v1/plans
router.get('/', Plans);

module.exports = router;
