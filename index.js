const express = require('express');
const { generateResponse } = require('./utils/anthropicClient');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/analizar-error', async (req, res) => {
    const { errorMessage } = req.body;
    const mensaje = `
    Análisis de error en producción:
    Error recibido: "${errorMessage}"
    Por favor, proporciona una causa probable, posibles soluciones y ejemplos de código para solucionarlo.
    `;

    const response = await generateResponse(mensaje);

    if (response) {
        res.json({ message: response });
    } else {
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});