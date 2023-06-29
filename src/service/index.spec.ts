import axios, { AxiosInstance } from 'axios';
import nock from 'nock';

import * as auth from './auth-refresh';

import { interceptAfterResponseFail } from './index';

describe('interceptAfterResponseFail', () => {
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    axiosInstance = axios.create(); // Create a new Axios instance for each test case
  });

  afterEach(() => {
    nock.cleanAll(); // Clean up Nock after each test case
  });

  it('should refresh token and retry the request if status is 401', async () => {
    const config = {
      baseURL: 'https://example.com',
    };
    const error = {
      config,
      response: {
        status: 401,
      },
    };
    const accessToken = 'newAccessToken';

    // Mock the authRefresh function to return a new access token
    jest.spyOn(auth, 'authRefresh').mockResolvedValue({
      result: {
        accessToken,
      },
    } as any);

    // Set up the interceptors
    axiosInstance.interceptors.response.use(
      (response) => response,
      interceptAfterResponseFail(axiosInstance),
    );

    const result = await interceptAfterResponseFail(axiosInstance)(error);

    expect(result.config.headers.Authorization).toBe(accessToken);

    // Verify that the retry request was made
    expect(nock.isDone()).toBe(true);
    expect(nock.pendingMocks()).toHaveLength(0);
  });

  it('should reject the promise for non-401 error', async () => {
    const config = {
      baseURL: 'https://example.com',
    };
    const error = {
      config,
      response: {
        status: 500,
      },
    };

    // Set up the interceptors
    axiosInstance.interceptors.response.use(
      (response) => response,
      interceptAfterResponseFail(axiosInstance),
    );

    await expect(
      interceptAfterResponseFail(axiosInstance)(error),
    ).rejects.toEqual(error);
  });
});
