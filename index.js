// index.js
const express = require('express');
const path = require('path');
const YAML = require('yamljs');
const OpenApiValidator = require('express-openapi-validator');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

const cors = require('cors'); // Import CORS

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Load OpenAPI document
const apiSpecPath = path.join(__dirname, 'api', 'openapi.yaml');
const apiSpec = YAML.load(apiSpecPath);

// Serve Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

// Use OpenApiValidator middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpecPath,
    validateRequests: true, // (default)
    validateResponses: false, // Set to true to enable response validation
    validateSecurity: {
      handlers: {
        BearerToken: (req, scopes, schema) => {
          const authHeader = req.headers.authorization;
          if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const err = new Error('Missing or invalid Authorization header');
            err.status = 401;
            throw err;
          }
          const token = authHeader.split(' ')[1];
          // Replace this with your actual token validation logic
          if (token !== process.env.BEARER_TOKEN) {
            const err = new Error('Invalid token');
            err.status = 401;
            throw err;
          }
          // If valid, attach user info to the request object
          req.user = { id: 'user123', name: 'John Doe' };
        },
      },
    },
  })
);

// Define routes after OpenApiValidator middleware
app.use('/', require('./routes/policy'));
app.use('/', require('./routes/catalogs'));
app.use('/', require('./routes/payments'));

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
    errors: err.errors || [],
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});