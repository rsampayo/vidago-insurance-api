// controllers/policyController.js
const { v4: uuidv4 } = require('uuid');

// In-memory storage for policies
const policies = {};

/**
 * Initiates a new policy registration session.
 * Generates a unique policyId and stores it in the in-memory policies object.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.initiatePolicy = (req, res) => {
  const policyId = uuidv4();
  policies[policyId] = {
    steps: {},
  };
  res.status(201).json({ policyId });
};

/**
 * Submits data for a specific policy registration step.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.submitPolicyStep = (req, res) => {
  const { policyId, stepNumber } = req.params;
  const stepData = req.body;

  if (!policies[policyId]) {
    return res.status(404).json({ status: false, message: 'Policy ID not found' });
  }

  const stepKey = `step${stepNumber}`;
  policies[policyId].steps[stepKey] = stepData;
  res.json({ message: `Step ${stepNumber} submitted successfully` });
};

/**
 * Retrieves data for a specific policy registration step.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getPolicyStep = (req, res) => {
  const { policyId, stepNumber } = req.params;

  if (!policies[policyId]) {
    return res.status(404).json({ status: false, message: 'Policy ID not found' });
  }

  const stepData = policies[policyId].steps[`step${stepNumber}`];
  if (!stepData) {
    return res.status(404).json({ status: false, message: `Step ${stepNumber} data not found` });
  }

  res.json(stepData);
};

/**
 * Retrieves data for policy registration steps 1 to 5.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getPolicySteps1to5 = (req, res) => {
  const { policyId } = req.params;

  if (!policies[policyId]) {
    return res.status(404).json({ status: false, message: 'Policy ID not found' });
  }

  const { step1, step2, step3, step4, step5 } = policies[policyId].steps;

  res.json({
    step1,
    step2,
    step3,
    step4,
    step5,
  });
};

/**
 * Processes the policy registration and returns the policyFolio number upon success.
 * Validates that all required steps are completed before processing.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.processPolicy = (req, res) => {
  const { policyId } = req.params;

  // Check if the policy exists
  if (!policies[policyId]) {
    return res.status(404).json({ status: false, message: 'Policy ID not found' });
  }

  const policy = policies[policyId];

  // Define required steps for processing
  const requiredSteps = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7'];

  // Identify any missing steps
  const missingSteps = requiredSteps.filter(step => !policy.steps[step]);

  if (missingSteps.length > 0) {
    return res.status(400).json({
      status: false,
      message: `Cannot process policy. Missing steps: ${missingSteps.join(', ')}`,
    });
  }

  // Check if the policy has already been processed
  if (policy.policyFolio) {
    return res.status(400).json({
      status: false,
      message: 'Policy has already been processed.',
    });
  }

  // Generate a unique policyFolio number (e.g., a random 6-digit number)
  const policyFolio = Math.floor(100000 + Math.random() * 900000);

  // Assign the policyFolio to the policy
  policy.policyFolio = policyFolio;

  res.json({ policyFolio });
};
