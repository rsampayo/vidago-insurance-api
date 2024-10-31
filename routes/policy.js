// routes/policy.js
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  initiatePolicy,
  submitPolicyStep,
  getPolicyStep,
  getPolicySteps1to5,
  processPolicy,
} = require('../controllers/policyController');

// Route: POST /api/v1/policy/initiate
router.post('/initiate', initiatePolicy);

// Routes: PATCH /api/v1/policy/:policy_id/step/:stepNumber and GET /api/v1/policy/:policy_id/step/:stepNumber
router.patch('/:policy_id/step/:stepNumber', submitPolicyStep);
router.get('/:policy_id/step/:stepNumber', getPolicyStep);

// Route: GET /api/v1/policy/:policy_id/steps
router.get('/:policy_id/steps', getPolicySteps1to5);

// Route: PATCH /api/v1/policy/:policy_id/process
router.patch('/:policy_id/process', processPolicy);

module.exports = router;
