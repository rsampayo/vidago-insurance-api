// controllers/paymentsController.js

// Sample data for billing responses
const billingResponses = [];

exports.submitBilling = (req, res) => {
  const { policyId } = req.params;
  const billingData = req.body;

  // Simulate billing process
  const billingResponse = {
    acceptance: 'ABC123',
    authorization: 'AUTH456',
    status: {
      status: true,
      message: 'Billing successful',
      errorType: null,
    },
    amountCharged: billingData.amount,
    operation: 'Charge',
    reference: 'REF789',
    card: billingData.cardNumber.slice(-4), // Masked card number
  };

  billingResponses.push({ policyId, billingResponse });

  res.json(billingResponse);
};
