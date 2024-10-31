// controllers/catalogController.js

// Sample data for catalogs
const catalogsData = {
  BANCOS_PARTICIPANTES: [
    { id: 'banco1', value: 'BANCOMER' },
    { id: 'banco2', value: 'BBVA' },
    // Add more as needed
  ],
  DEPORTES_PELIGROSOS: [
    { id: 'deporte1', value: 'Skydiving' },
    { id: 'deporte2', value: 'Rock Climbing' },
    // Add more as needed
  ],
  KINSHIP: [
    { id: 'kinship1', value: 'Cónyuge' },
    { id: 'kinship2', value: 'Hijo/Hija' },
    // Add more as needed
  ],
  COUNTRIES: [
    { id: 'country1', value: 'Mexico' },
    { id: 'country2', value: 'Canada' },
    // Add more as needed
  ],
  BANNED_COUNTRIES: [
    { id: 'banned1', value: 'North Korea' },
    { id: 'banned2', value: 'Iran' },
    // Add more as needed
  ],
  STATES: [
    { id: 'state1', value: 'Tamaulipas' },
    { id: 'state2', value: 'Puebla' },
    // Add more as needed
  ],
};

/**
 * Retrieves a specific catalog based on catalog_type.
 * GET /api/v1/catalogs?catalog_type=...
 */
exports.catalogs = (req, res) => {
  const { catalog_type } = req.query;

  if (!catalog_type || !catalogsData[catalog_type]) {
    return res.status(400).json({
      status: false,
      message: 'Invalid catalog_type or catalog_type not provided.',
    });
  }

  res.status(200).json(catalogsData[catalog_type]);
};
