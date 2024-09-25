// controllers/policyController.js
const { v4: uuidv4 } = require('uuid');

// In-memory storage for policies
const policies = {};

exports.initiatePolicy = (req, res) => {
  const policyId = uuidv4();
  policies[policyId] = {
    steps: {},
  };
  res.status(201).json({ policyId });
};

exports.submitPolicyStep = (req, res) => {
  const { policyId, stepNumber } = req.params;
  const stepData = req.body;

  if (!policies[policyId]) {
    return res.status(404).json({ status: false, message: 'Policy ID not found' });
  }

  policies[policyId].steps[`step${stepNumber}`] = stepData;
  res.json({ message: `Step ${stepNumber} submitted successfully` });
};

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
