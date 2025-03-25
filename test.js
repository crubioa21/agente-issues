const axios = require('axios');

const testApi = async () => {
  try {
    const response = await axios.post('http://localhost:3000/analizar-error', {
      errorMessage: 'TypeError: Cannot read property of undefined'
    });

    console.log('Respuesta del servidor:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error al hacer la prueba:', error.message);

    if (error.response) {
      console.error('Código de estado:', error.response.status);
      console.error('Datos del error:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No hubo respuesta del servidor:', error.request);
    } else {
      console.error('Error al configurar la solicitud:', error.message);
    }
  }
};

testApi();
