// routes/policy.js
const express = require('express');
const router = express.Router();

// Import controller functions, including the new processPolicy
const {
  initiatePolicy,
  submitPolicyStep,
  getPolicyStep,
  getPolicySteps1to5,
  processPolicy, // Ensure this is exported from policyController.js
} = require('../controllers/policyController');

// Route: POST /policy/initiate
router.post('/policy/initiate', initiatePolicy);

// Routes: PATCH /policy/{policyId}/step/{stepNumber} and GET /policy/{policyId}/step/{stepNumber}
router.patch('/policy/:policyId/step/:stepNumber', submitPolicyStep);
router.get('/policy/:policyId/step/:stepNumber', getPolicyStep);

// Route: GET /policy/{policyId}/steps
router.get('/policy/:policyId/steps', getPolicySteps1to5);

// New Route: PATCH /policy/{policyId}/process
router.patch('/policy/:policyId/process', processPolicy);

module.exports = router;
