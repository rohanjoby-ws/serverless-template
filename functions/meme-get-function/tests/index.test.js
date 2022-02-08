import * as utils from '@utils';
import * as meme from '@services/memes';
import { handler } from '../index';
import data from '../data.json';

describe('github-post-function tests', () => {
	let event, apiSuccessSpy, apiFailureSpy;
	let mockGetMemes = jest.fn();
	const callBackSpy = jest.fn();
	const contextSpy = jest.fn();
	const MOCK_RESPONSE = { memeData: 'response data' };

	beforeEach(() => {
		apiSuccessSpy = jest.spyOn(utils, 'apiSuccess');
		apiFailureSpy = jest.spyOn(utils, 'apiFailure');
	});
	beforeAll(() => {
		event = data.event;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should call the meme-get-function', async () => {
		mockGetMemes = jest
			.spyOn(meme, 'getMemes')
			.mockImplementation(Promise.resolve(MOCK_RESPONSE));
		// mock return value
		mockGetMemes.mockReturnValue(Promise.resolve(MOCK_RESPONSE));
		await handler(event, contextSpy, callBackSpy);

		expect(mockGetMemes).toHaveBeenCalledTimes(1);
		expect(callBackSpy).toHaveBeenCalledTimes(1);

		// request and success calls
		expect(apiSuccessSpy).toHaveBeenCalledTimes(1);
		expect(apiSuccessSpy).toHaveBeenCalledWith(callBackSpy, MOCK_RESPONSE);

		expect(callBackSpy).toBeCalledWith(null, {
			body: JSON.stringify({
				data: MOCK_RESPONSE,
			}),
		});
	});

	it('should handle failure scenario correctly', async () => {
		const error = { message: 'some error', code: 404 };
		mockGetMemes.mockRejectedValueOnce(error);

		await handler(event, contextSpy, callBackSpy);
		expect(apiFailureSpy).toHaveBeenCalledTimes(1);
	});
});
