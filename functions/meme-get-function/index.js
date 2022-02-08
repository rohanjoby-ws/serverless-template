import { apiSuccess, apiFailure } from '@utils';
import { getMemes } from '@services/memes';

exports.handler = async (event, _context, callback) => {
	console.log({ event: JSON.stringify(event) });
	try {
		const response = await getMemes();
		return apiSuccess(callback, response);
	} catch (error) {
		console.error(error);
		return apiFailure(callback, error);
	}
};
