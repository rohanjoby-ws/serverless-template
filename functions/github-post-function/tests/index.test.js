import * as utils from '@utils';
import * as github from '@services/github';
import { handler } from '../index';
import data from '../data.json';

describe('github-post-function tests', () => {
	let event, apiSuccessSpy, apiFailureSpy;
	let mockGetUserData = jest.fn();
	const callBackSpy = jest.fn();
	const contextSpy = jest.fn();
	const MOCK_RESPONSE = { userData: 'response data' };

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

	it('should call the github-post-function', async () => {
		mockGetUserData = jest
			.spyOn(github, 'getUser')
			.mockImplementation(Promise.resolve(MOCK_RESPONSE));
		// mock return value
		mockGetUserData.mockReturnValue(Promise.resolve(MOCK_RESPONSE));
		await handler(event, contextSpy, callBackSpy);

		expect(mockGetUserData).toBeCalledWith('rohanjoby-ws');
		expect(callBackSpy).toHaveBeenCalledTimes(1);

		// request and success calls
		expect(apiSuccessSpy).toHaveBeenCalledTimes(1);
		expect(apiSuccessSpy).toHaveBeenCalledWith(callBackSpy, MOCK_RESPONSE);

		expect(callBackSpy).toBeCalledWith(null, {
			body: JSON.stringify({
				userData: MOCK_RESPONSE,
			}),
		});
	});

	it('should handle failure scenario correctly', async () => {
		const error = { message: 'some error', code: 404 };
		mockGetUserData.mockRejectedValueOnce(error);

		await handler(event, contextSpy, callBackSpy);
		expect(apiFailureSpy).toHaveBeenCalledTimes(1);
	});
});
