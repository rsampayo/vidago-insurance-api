// controllers/postalCodeController.js

// Sample data for postal codes
const postalCodes = {
    '57000': {
      municipality: 'Nezahualcoyotl',
      city: 'Nezahualcoyotl',
      state_address: 'Mexico',
      country: 'Mexico',
      neighborhoods: ['Benito Juarez', 'Centro'],
    },
    '12345': {
      municipality: 'Sample Municipality',
      city: 'Sample City',
      state_address: 'Sample State',
      country: 'Mexico',
      neighborhoods: ['Sample Neighborhood'],
    },
    // Add more as needed
  };
  
  /**
   * Retrieves location details based on postal code.
   * GET /api/v1/postalCodes/:postal_code
   */
  exports.getLocationByPostalCode = (req, res) => {
    const { postal_code } = req.params;
  
    if (!/^\d{5}$/.test(postal_code)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid postal_code format. Expected 5 digits.',
      });
    }
  
    const location = postalCodes[postal_code];
    if (!location) {
      return res.status(404).json({
        status: false,
        message: 'Postal code not found.',
      });
    }
  
    res.status(200).json(location);
  };
  