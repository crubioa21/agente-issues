const axios = require('axios');

const anthropicClient = axios.create({
    baseURL: 'https://api.anthropic.com/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`
    }
});

const generateResponse = async (prompt) => {
    try {
        const response = await anthropicClient.post('/completions', {
            prompt,
            max_tokens: 1000,
            model: 'claude-v1'
        });
        return response.data;
    } catch (error) {
        console.error('Error al llamar a la API de Anthropic:', error.message);
        return null;
    }
};

module.exports = { generateResponse };
