require('dotenv').config();
const express = require('express');
const { generateResponse } = require('./utils/anthropicClient');

const app = express();
app.use(express.json());

app.post('/analizar-error', async (req, res) => {
    const { errorMessage } = req.body;

    const prompt = `
    Análisis de error en producción:
    Error recibido: "${errorMessage}"
    Por favor, proporciona una causa probable, posibles soluciones y ejemplos de código para solucionarlo.
    `;

    const response = await generateResponse(prompt);

    if (response) {
        res.json({ message: response.completion });
    } else {
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
