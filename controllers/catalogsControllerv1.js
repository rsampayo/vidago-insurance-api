// controllers/catalogsController.js

// Sample data for catalogs
const occupations = [
  { id: 1, description: 'Engineer', risk: 'NORMAL' },
  { id: 2, description: 'Doctor', risk: 'NORMAL' },
  { id: 3, description: 'Firefighter', risk: 'SUBNORMAL' },
];

const catalogs = {
  PARTICIPATING_BANKS: [
    { id: 'BANCOMER', value: 'BANCOMER' },
    { id: 'BBVA', value: 'BBVA' },
    { id: 'SANTANDER', value: 'SANTANDER' },
    { id: 'HSBC', value: 'HSBC' },
    { id: 'OTHER', value: 'OTHER' },
  ],
  // Add other catalog types as needed
};

const plans = [
  {
    id: '001',
    productName: 'BASIC_001',
    fullName: 'Standard Basic Plan',
    paymentMethods: [
      { paymentMethod: 'Monthly', premium: 250 },
      { paymentMethod: 'Yearly', premium: 2800 },
    ],
    coverages: [
      { name: 'Health', insuredAmount: 50000 },
      { name: 'Accident', insuredAmount: 100000 },
    ],
  },
  {
    id: '002',
    productName: 'PREM_002',
    fullName: 'Premium Plan',
    paymentMethods: [
      { paymentMethod: 'Monthly', premium: 350 },
      { paymentMethod: 'Yearly', premium: 4000 },
    ],
    coverages: [
      { name: 'Health', insuredAmount: 100000 },
      { name: 'Accident', insuredAmount: 200000 },
    ],
  },
];

const postalCodes = {
  '57000': {
    municipality: 'Nezahualcoyotl',
    city: 'Nezahualcoyotl',
    state: 'Mexico',
    country: 'Mexico',
    neighborhoods: ['Benito Juarez', 'Centro'],
  },
  // Add other postal codes as needed
};

exports.getOccupationsList = (req, res) => {
  res.json(occupations);
};

exports.getCatalogs = (req, res) => {
  const { catalogType } = req.query;
  const catalog = catalogs[catalogType];
  if (!catalog) {
    return res.status(400).json({ status: false, message: 'Invalid catalog type' });
  }
  res.json(catalog);
};

exports.getPlans = (req, res) => {
  res.json({ plans });
};

exports.getLocationByPostalCode = (req, res) => {
  const { postalCode } = req.params;
  const location = postalCodes[postalCode];
  if (!location) {
    return res.status(404).json({ status: false, message: 'Postal code not found' });
  }
  res.json(location);
};
