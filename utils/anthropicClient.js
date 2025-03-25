// utils/anthropicClient.js
const axios = require('axios');
require('dotenv').config();

const anthropicClient = axios.create({
    baseURL: 'https://api.anthropic.com/v1',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
    }
});

const generateResponse = async (message) => {
    try {
        const response = await anthropicClient.post('/messages', {
            model: 'claude-3-opus-20240229',
            max_tokens: 1000,
            messages: [
                {
                    role: 'user',
                    content: message
                }
            ]
        });

        // Verificar si la respuesta tiene el contenido esperado
        if (response.data && Array.isArray(response.data.content) && response.data.content[0]?.text) {
            return response.data.content[0].text;
        } else {
            console.error('Respuesta inesperada de la API de Anthropic:', JSON.stringify(response.data, null, 2));
            return null;
        }
    } catch (error) {
        console.error('Error llamando a la API de Anthropic:', error.message);
        if (error.response) {
            console.error('Código de estado:', error.response.status);
            console.error('Datos de la respuesta:', JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
            console.error('Sin respuesta del servidor:', error.request);
        } else {
            console.error('Error al configurar la solicitud:', error.message);
        }
        return null;
    }
};

module.exports = { generateResponse };
