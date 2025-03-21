const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const createIssue = async (title, body) => {
    try {
        const response = await octokit.issues.create({
            owner: 'crubioa21',
            repo: 'tuRepositorio',
            title,
            body,
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el issue en GitHub:', error.message);
        return null;
    }
};

module.exports = { createIssue };