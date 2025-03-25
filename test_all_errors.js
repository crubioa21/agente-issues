const axios = require('axios');

// Array of common JavaScript errors to test
const errorExamples = [
  'TypeError: Cannot read property "name" of undefined',
  'ReferenceError: someVariable is not defined',
  'SyntaxError: Unexpected token }',
  'RangeError: Maximum call stack size exceeded',
  'Error: Failed to fetch: Network error',
  'URIError: URI malformed',
  'AssertionError: Expected 5 to equal 10',
  'SequelizeValidationError: String is not in the correct format',
  'MongoError: E11000 duplicate key error collection',
  'Error: ENOENT: no such file or directory, open "/path/to/file.js"'
];

// Function to test a specific error
const testError = async (errorMessage) => {
  try {
    console.log(`Testing error: ${errorMessage}`);
    const response = await axios.post('http://localhost:3000/analizar-error', {
      errorMessage
    });

    console.log('Respuesta del servidor:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('----------------------------\n');
  } catch (error) {
    console.error('Error al hacer la prueba:', error.message);
    if (error.response) {
      console.error('Código de estado:', error.response.status);
      console.error('Datos del error:', JSON.stringify(error.response.data, null, 2));
    }
    console.log('----------------------------\n');
  }
};

// Test a specific error
const testSingleError = async (index = 0) => {
  await testError(errorExamples[index]);
};

// Test all errors
const testAllErrors = async () => {
  for (const error of errorExamples) {
    await testError(error);
  }
};

// Uncomment one of these lines to run tests
testSingleError(1); // Test a specific error by index
// testAllErrors(); // Test all errors in sequence