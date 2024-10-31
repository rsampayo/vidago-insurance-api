// controllers/plansController.js

// Sample data for plans
const plans = [
    {
      id: '001',
      product_name: 'BASIC001',
      full_name: 'Basico',
      payment_methods: [
        { payment_method: 'MENSUAL', premium: 250 },
        { payment_method: 'ANUAL', premium: 2800 },
      ],
      coverages: [
        { name: 'Health', insured_amount: 50000 },
        { name: 'Accident', insured_amount: 100000 },
      ],
    },
    {
      id: '002',
      product_name: 'PREM002',
      full_name: 'Premium',
      payment_methods: [
        { payment_method: 'MENSUAL', premium: 350 },
        { payment_method: 'ANUAL', premium: 4000 },
      ],
      coverages: [
        { name: 'Health', insured_amount: 100000 },
        { name: 'Accident', insured_amount: 200000 },
      ],
    },
    // Add more as needed
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
  
    // For dummy purposes, return all plans
    res.status(200).json({ plans });
  };
  