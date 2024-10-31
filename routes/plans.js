// routes/plans.js
const express = require('express');
const router = express.Router();

// Import controller functions
const { Plans } = require('../controllers/plansController');

// Route: GET /api/v1/plans
router.get('/plans', Plans);

module.exports = router;
