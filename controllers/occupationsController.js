// controllers/occupationsController.js

// Sample data for occupations
const occupations = [
    { argos_occupation_id: 1, description: 'Engineer', risk: 'NORMAL' },
    { argos_occupation_id: 2, description: 'Pilot', risk: 'SUBNORMAL' },
    // Add more occupations as needed
  ];
  
  /**
   * Retrieves the list of occupations.
   * GET /api/v1/occupations
   */
  exports.occupationsList = (req, res) => {
    res.status(200).json(occupations);
  };
  