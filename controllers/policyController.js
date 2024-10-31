// controllers/policyController.js
const { v4: uuidv4 } = require('uuid');

// In-memory storage for policies (for dummy purposes)
const policies = {};

/**
 * Initiates a new policy registration process.
 * POST /api/v1/policy/initiate
 */
exports.initiatePolicy = (req, res) => {
  const policyId = uuidv4();
  policies[policyId] = {
    steps: {},
    processed: false,
  };
  res.status(201).json({ policy_id: policyId });
};

/**
 * Submits data for a specific policy step.
 * PATCH /api/v1/policy/:policy_id/step/:stepNumber
 */
exports.submitPolicyStep = (req, res) => {
  const { policy_id, stepNumber } = req.params;
  const stepData = req.body;

  if (!policies[policy_id]) {
    return res.status(404).json({ status: false, message: 'Policy not found.' });
  }

  // Validate stepNumber is between 1 and 7
  const stepNum = parseInt(stepNumber, 10);
  if (isNaN(stepNum) || stepNum < 1 || stepNum > 7) {
    return res.status(400).json({ status: false, message: 'Invalid step number.' });
  }

  // Store the step data
  policies[policy_id].steps[`step${stepNumber}`] = stepData;
  res.status(200).json({ message: `Step ${stepNumber} submitted successfully.` });
};

/**
 * Retrieves data for a specific policy step.
 * GET /api/v1/policy/:policy_id/step/:stepNumber
 */
exports.getPolicyStep = (req, res) => {
  const { policy_id, stepNumber } = req.params;

  if (!policies[policy_id]) {
    return res.status(404).json({ status: false, message: 'Policy not found.' });
  }

  const stepData = policies[policy_id].steps[`step${stepNumber}`];
  if (!stepData) {
    return res.status(404).json({ status: false, message: `Step ${stepNumber} data not found.` });
  }

  res.status(200).json(stepData);
};

/**
 * Retrieves data for steps 1 to 5 of a policy.
 * GET /api/v1/policy/:policy_id/steps
 */
exports.getPolicySteps1to5 = (req, res) => {
  const { policy_id } = req.params;

  if (!policies[policy_id]) {
    return res.status(404).json({ status: false, message: 'Policy not found.' });
  }

  const steps = {};
  for (let i = 1; i <= 5; i++) {
    const stepData = policies[policy_id].steps[`step${i}`];
    if (stepData) {
      steps[`step${i}`] = stepData;
    }
  }

  res.status(200).json(steps);
};

/**
 * Processes a policy and generates a policy folio.
 * PATCH /api/v1/policy/:policy_id/process
 */
exports.processPolicy = (req, res) => {
  const { policy_id } = req.params;

  if (!policies[policy_id]) {
    return res.status(404).json({ status: false, message: 'Policy not found.' });
  }

  if (policies[policy_id].processed) {
    return res.status(400).json({ status: false, message: 'Policy already processed.' });
  }

  // Simulate processing and generate policy folio
  const policyFolio = Math.floor(1000000000 + Math.random() * 9000000000);
  policies[policy_id].processed = true;
  policies[policy_id].policy_folio = policyFolio;

  res.status(200).json({ policy_folio: policyFolio });
};
