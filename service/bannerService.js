import { apiClient } from '@/utlis/ApiClient'


const buildQueryString = (filters) => {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.append(key, String(value))
        }
    })

    return params.toString()
}

export class BannerService {
    static async getBannersByPosition(position) {
        try {
            const response = await apiClient.get(`/banners/position/${position}`)
            return response // Return the full response object, not just response.banners
        } catch (error) {
            console.error('Error fetching banners by position:', error)
            throw error
        }
    }

    // Admin: Get all banners with pagination
    static async getAllBanners(filters = {}) {
        try {
            const queryString = buildQueryString(filters)
            const response = await apiClient.get(`/banners/all?${queryString}`)
            return response
        } catch (error) {
            console.error('Error fetching all banners:', error)
            throw error
        }
    }

    static async getBannerById(id) {
        try {
            const response = await apiClient.get(`/banners/${id}`)
            return response // This one was already correct
        } catch (error) {
            console.error('Error fetching banner:', error)
            throw error
        }
    }
}

export const getBannersByPosition = (banners, position) => {
    return banners.filter(banner => banner.position === position && banner.isActive);
};

export default BannerService