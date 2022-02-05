import axios from 'axios';

const generateGithubClient = () => {
	const githubClient = axios.create({
		baseURL: process.env.GITHUB_API_URL,
		headers: {
			Accept: 'application/vnd.github.v3+json',
		},
	});
	return githubClient;
};

export const getOrganizations = async (
	organization = 'wednesday-solutions'
) => {
	const githubClient = generateGithubClient();
	const repoData = await githubClient.get(`/orgs/${organization}`);
	return repoData.data;
};
