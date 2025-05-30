export class ApiError extends Error {
    constructor(
        status,
        message,
        data
    ) {
        super(message);
        this.name = 'ApiError';
    }
}