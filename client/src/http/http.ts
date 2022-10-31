import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    if (!config.headers) config.headers = {};

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
    }

    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status == 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.get(`${API_URL}/auth/refresh`, {
                    withCredentials: true,
                });
                localStorage.setItem('accessToken', response.data.accessToken);
                return $api.request(originalRequest);
            } catch (e) {
                console.log('NO AUTH');
            }
        }

        throw error;
    },
);
