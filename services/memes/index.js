import axios from 'axios';

const generateMemeMakerClient = () => {
	const memeMakerClient = axios.create({
		baseURL: process.env.MEME_API_URL,
	});
	return memeMakerClient;
};

export const getMemes = async () => {
	const memeMakerClient = generateMemeMakerClient();
	const memesDetails = await memeMakerClient.get(`/`);
	return memesDetails.data;
};
