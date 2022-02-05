import { apiSuccess, apiFailure } from '@utils';
import { getOrganizations } from '@services/github';

exports.handler = async (event, _context, callback) => {
	console.log(JSON.stringify(event));
	try {
		const response = await getOrganizations();
		return apiSuccess(callback, response);
	} catch (error) {
		console.error(error);
		return apiFailure(callback, error);
	}
};
