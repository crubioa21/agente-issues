const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const createIssue = async (title, body) => {
  try {
    const owner = 'crubioa21'; // Your GitHub username
    const repo = 'agente-issues'; // Your repository name

    const response = await octokit.issues.create({
      owner,
      repo,
      title,
      body
    });

    return response.data;
   } catch (error) {
       console.error('GitHub API error details:', error.response?.data || error.message);
       return null;
   }
};


module.exports = { createIssue };