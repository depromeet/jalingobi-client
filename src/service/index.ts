import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import packageJson from '../../package.json';

import { authRefresh } from './auth-refresh';

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `${token}`;
};

export const interceptAfterResponseFail =
  (axiosInstance: AxiosInstance) => async (error: any) => {
    const { config } = error;
    const originalRequest = config;

    if (error.response.status === 401) {
      try {
        const {
          result: { accessToken },
        } = (await authRefresh(axiosInstance)) as any;

        axiosInstance.defaults.headers.common.Authorization = `${accessToken}`;
        return Promise.resolve(axiosInstance(originalRequest));
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  };

const setInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    interceptAfterResponseFail(axiosInstance).bind(this),
  );
};

const createAxios = (axiosConfig: CreateAxiosDefaults) => {
  const axiosInstance = axios.create(axiosConfig);

  axiosInstance.defaults.withCredentials = true;
  setInterceptors(axiosInstance);

  return axiosInstance;
};

export const httpClient = createAxios({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

console.log(packageJson.version);
