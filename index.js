const express = require('express');
const { createIssue } = require('./utils/githubClient');
const { generateResponse } = require('./utils/anthropicClient');
require('dotenv').config();

const app = express();
app.use(express.json());

const createIssueBody = (errorMessage, analysis) => {
    return `
## 🛑 Error Detectado: ${errorMessage.split(':')[0]}

**Fecha:** ${new Date().toLocaleString()}

### 📌 Descripción del Error
\`\`\`
${errorMessage}
\`\`\`

---

### 🔍 Análisis del Problema
${analysis}

---

### 💡 Posibles Soluciones
- Verificar la existencia del objeto antes de acceder a sus propiedades.
- Usar el operador de encadenamiento opcional (\`?.\`).
- Asignar valores predeterminados para evitar propiedades \`undefined\`.

---

### 🚀 Acción Recomendada
- Revisar el módulo o archivo donde ocurrió el error.
- Realizar pruebas unitarias para verificar el comportamiento después de la corrección.
- Actualizar la documentación si es necesario.

---

🔖 **Etiquetas:** \`bug\`, \`high-priority\`
👥 **Asignado a:** @crubioa21
`;
};

app.post('/analizar-error', async (req, res) => {
    const { errorMessage } = req.body;

    if (!errorMessage) {
        return res.status(400).json({ error: 'El mensaje de error es obligatorio.' });
    }

    const prompt = `
    Análisis de error en producción:
    Error recibido: "${errorMessage}"
    Por favor, proporciona una causa probable, posibles soluciones y ejemplos de código para solucionarlo.
    `;

    try {
        const analysis = await generateResponse(prompt);

        if (analysis) {
            const issueTitle = `🚨 Error detectado: ${errorMessage.split(':')[0]}`;
            const issueBody = createIssueBody(errorMessage, analysis);

            const issue = await createIssue(issueTitle, issueBody);

            if (issue) {
                res.json({ message: 'Issue creado exitosamente.', issueUrl: issue.html_url });
            } else {
                res.status(500).json({ error: 'Error al crear el issue en GitHub.' });
            }
        } else {
            res.status(500).json({ error: 'Error al generar el análisis con Anthropic.' });
        }
    } catch (error) {
        console.error("Error en el endpoint:", error.message);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});