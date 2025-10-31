import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_STRAPI_PUBLIC_URL || process.env.EXPO_PUBLIC_STRAPI_TEST_URL;
const STRAPI_ADMIN_TOKEN = process.env.EXPO_PUBLIC_STRAPI_ADMIN_TOKEN;

export const client = axios.create({
    baseURL: `${API_URL}/api`,
    timeout: 10000,
});

export const adminClient = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        Authorization: `Bearer ${STRAPI_ADMIN_TOKEN}`,
    },
    timeout: 10000,
});

const onResponse = (response) => response.data;
const onError = (error) => {
    const status = error.response?.status ?? 'NO_RESPONSE';
    const url = `${error.config?.baseURL || ''}${error.config?.url || ''}`;
    console.error(`❌ Strapi error: ${status} → ${url} :: ${error.message}`);
    return Promise.reject(error);
};

client.interceptors.response.use(onResponse, onError);
adminClient.interceptors.response.use(onResponse, onError);