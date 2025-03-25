const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const createIssue = async (title, body) => {
    try {
        console.log("Creando un issue en GitHub:", title);
        const response = await octokit.issues.create({
            owner: 'crubioa21',  // Tu nombre de usuario en GitHub
            repo: 'agente-issues',  // Nombre del repositorio
            title,
            body,
        });
        console.log("Issue creado exitosamente:", response.data.html_url);
        return response.data;
    } catch (error) {
        console.error("Error al crear el issue en GitHub:", error.response?.data || error.message);
        return null;
    }
};

module.exports = { createIssue };
