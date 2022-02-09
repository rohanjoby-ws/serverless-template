import { apiSuccess, apiFailure } from '@utils';
import { getUser } from '@services/github';

exports.handler = async (event, _context, callback) => {
	console.log({ event: JSON.stringify(event) });
	const requestBody = JSON.parse(event.body);
	try {
		const response = await getUser(requestBody.user);
		return apiSuccess(callback, response);
	} catch (error) {
		console.error(error);
		return apiFailure(callback, error);
	}
};
