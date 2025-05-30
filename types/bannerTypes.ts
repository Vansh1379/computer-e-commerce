// Banner Position Types
export type BannerPosition =
    | 'home_left_one'
    | 'home_right_two'
    | 'home_right_three'
    | 'home_mid_one'
    | 'home_mid_two'
    | 'home_low_mid_one'
    | 'home_low_mid_two'
    | 'home_right_one'

// Banner Entity
export interface Banner {
    id: number
    title: string
    subtitle?: string
    imageUrl: string
    linkUrl?: string
    position: BannerPosition
    startDate: string | Date
    endDate: string | Date
    isActive: boolean
    displayOrder: number
    categoryId?: number
    createdAt: string | Date
    updatedAt: string | Date
    // Include category relation if populated
    category?: {
        id: number
        name: string
        slug: string
    }
}

// Banner Filters for API queries
export interface BannerFilters {
    page?: number
    limit?: number
    position?: BannerPosition
    isActive?: boolean
    categoryId?: number
    startDate?: string
    endDate?: string
}

// API Response Types
export interface BannerResponse {
    success: boolean
    count: number
    totalPages?: number
    currentPage?: number
    banners: Banner[]
}

export interface SingleBannerResponse {
    success: boolean
    banner: Banner
    message?: string
}

export interface BannerPositionsResponse {
    success: boolean
    count: number
    banners: Banner[]
}