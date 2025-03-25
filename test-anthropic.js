// test-anthropic-direct.js
require('dotenv').config();
const axios = require('axios');

const testAnthropicDirectly = async () => {
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-opus-20240229', // Updated model name
        max_tokens: 100,
        messages: [
          {
            role: 'user',
            content: 'Hola! hello!'
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    console.log('Exitoso! Respuesta:', response.data);
  } catch (error) {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
  }
};

testAnthropicDirectly();