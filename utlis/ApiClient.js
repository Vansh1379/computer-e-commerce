import { API_CONFIG } from '@/config/api.config';
import { ApiError } from './apiError';
import { getLocalStorage } from './getLocalStorage';

export class ApiClient {
    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
        this.timeout = API_CONFIG.TIMEOUT;
    }

    getAuthToken() {
        return getLocalStorage('auth-token');
    }

    async makeRequest(endpoint, options = {}) {
        const token = this.getAuthToken();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...config,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Network error' }));
                throw new ApiError(response.status, errorData.message || `HTTP ${response.status}`, errorData);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            }

            return response;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof ApiError) {
                throw error;
            }

            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    throw new ApiError(408, 'Request timeout');
                }
                throw new ApiError(0, error.message);
            }

            throw new ApiError(0, 'Unknown error occurred');
        }
    }

    async get(endpoint, params) {
        const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
        return this.makeRequest(url, { method: 'GET' });
    }

    async post(endpoint, data) {
        return this.makeRequest(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put(endpoint, data) {
        return this.makeRequest(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async patch(endpoint, data) {
        return this.makeRequest(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete(endpoint) {
        return this.makeRequest(endpoint, { method: 'DELETE' });
    }

    async downloadFile(endpoint) {
        const token = this.getAuthToken();

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!response.ok) {
            throw new ApiError(response.status, 'Download failed');
        }

        return response.blob();
    }

    async uploadFile(endpoint, formData) {
        const token = this.getAuthToken();

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
                // Don't set Content-Type for FormData, let browser set it with boundary
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
            throw new ApiError(response.status, errorData.message || 'Upload failed', errorData);
        }

        return response.json();
    }
}

export const apiClient = new ApiClient();