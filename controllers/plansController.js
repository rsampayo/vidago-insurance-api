// controllers/plansController.js

// Updated data for plans
const plans = [
  {
    id: 1,
    product_name: "PLAN500",
    full_name: "PREMIUM",
    risk: "NORMAL",
    plan_premiums: [
      { min_age: 18, max_age: 18, payment_method: "MENSUAL", premium: "250.0" },
      { min_age: 18, max_age: 18, payment_method: "ANUAL", premium: "2700.0" },
    ],
    plan_coverages: [
      { name: "FALLECIMIENTO", insured_amount: "500000.0", note: null },
      { name: "MUERTE ACCIDENTAL", insured_amount: "250000.0", note: null },
      { name: "SUMA ASEGURADA POR INVALIDEZ TOTAL Y PERMANENTE", insured_amount: "250000.0", note: null },
      { name: "GRAVES ENFERMEDADES", insured_amount: "250000.0", note: null },
      { name: "ANTICIPO POR ENFERMEDAD TERMINAL", insured_amount: "0.0", note: null },
    ],
  },
  {
    id: 2,
    product_name: "EXPPLAN100",
    full_name: "BASICO",
    risk: "NORMAL",
    plan_premiums: [
      { min_age: 18, max_age: 18, payment_method: "MENSUAL", premium: "100.0" },
      { min_age: 18, max_age: 18, payment_method: "ANUAL", premium: "1200.0" },
    ],
    plan_coverages: [
      { name: "FALLECIMIENTO", insured_amount: "100000.0", note: null },
      { name: "MUERTE ACCIDENTAL", insured_amount: "100000.0", note: null },
      { name: "ANTICIPO PARA GASTOS INMEDIATOS", insured_amount: "25000.0", note: null },
      { name: "ANTICIPO POR ENFERMEDAD TERMINAL", insured_amount: "0.0", note: null },
    ],
  },
  // Add more plans as needed
];

/**
 * Retrieves a list of insurance plans based on filters.
 * GET /api/v1/plans
 */
exports.Plans = (req, res) => {
  const { policy_id, age, birth_date, risk, payment_method } = req.query;

  // Validation
  if (policy_id && (age || birth_date || risk || payment_method)) {
    return res.status(400).json({
      status: false,
      message: 'Cannot provide policy_id with other filtering parameters.',
    });
  }

  if (!policy_id && !age && !birth_date && !risk && !payment_method) {
    return res.status(400).json({
      status: false,
      message: 'At least one filtering parameter must be provided.',
    });
  }

  if (birth_date && !/^\d{4}-\d{2}-\d{2}$/.test(birth_date)) {
    return res.status(400).json({
      status: false,
      message: 'Invalid birth_date format. Expected YYYY-MM-DD.',
    });
  }

  let filteredPlans = plans;

  if (policy_id) {
    // Assuming policy_id corresponds to plan id
    filteredPlans = plans.filter(plan => plan.id.toString() === policy_id);
  } else {
    if (age) {
      const ageNumber = parseInt(age, 10);
      if (isNaN(ageNumber)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid age. It must be a number.',
        });
      }
      filteredPlans = filteredPlans.filter(plan => 
        plan.plan_premiums.some(premium => ageNumber >= premium.min_age && ageNumber <= premium.max_age)
      );
    }

    if (risk) {
      filteredPlans = filteredPlans.filter(plan => plan.risk.toLowerCase() === risk.toLowerCase());
    }

    if (payment_method) {
      filteredPlans = filteredPlans.filter(plan => 
        plan.plan_premiums.some(premium => premium.payment_method.toUpperCase() === payment_method.toUpperCase())
      );
    }

    // Additional filters based on birth_date can be implemented as needed
  }

  res.status(200).json({ plans: filteredPlans });
};
