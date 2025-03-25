const axios = require('axios');

const anthropicClient = axios.create({
    baseURL: 'https://api.anthropic.com/v1',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
    }
});

const listarModelos = async () => {
    try {
        console.log("Obteniendo lista de modelos disponibles...");
        const response = await anthropicClient.get('/models');
        console.log("Modelos disponibles:", response.data);
    } catch (error) {
        console.error("Error al obtener los modelos:", error.response?.data || error.message);
    }
};

listarModelos();
