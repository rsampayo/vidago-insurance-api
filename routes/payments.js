// routes/payments.js
const express = require('express');
const router = express.Router();

// Import controller functions
const { submitBilling } = require('../controllers/paymentsController');

// Route: PATCH /policy/{policyId}/step/7
router.patch('/policy/:policyId/step/7', submitBilling);

module.exports = router;
