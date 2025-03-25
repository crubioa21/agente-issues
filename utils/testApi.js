require('dotenv').config();
const axios = require('axios');

const anthropicClient = axios.create({
    baseURL: 'https://api.anthropic.com/v1',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
    }
});

const testApi = async () => {
    try {
        console.log("Realizando prueba directa con Anthropic...");
        const response = await anthropicClient.post('/complete', {
            model: 'claude-3-5-sonnet-20241022',  // Prueba con uno de los modelos disponibles
            prompt: "\n\nHuman: ¿Cuál es el clima en Medellín hoy?\n\nAssistant:",
            max_tokens_to_sample: 100,
            temperature: 0.7,
            top_p: 0.9
        });
        console.log("Respuesta de la API de Anthropic:", JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Error al llamar a la API de Anthropic:", error.response?.data || error.message);
    }
};

testApi();
