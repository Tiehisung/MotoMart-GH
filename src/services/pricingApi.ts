import { api } from "./_api";

export interface IPricingItem {
    _id: string;
    category: string;
    categoryName: string;
    key: string;
    label: string;
    description: string;
    amount: number;
    currency: string;
    features: string[];
    isPopular: boolean;
    isActive: boolean;
    displayOrder: number;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}

interface PricingResponse {
    success: boolean;
    count: number;
    data: Array<{
        category: string;
        categoryName: string;
        options: IPricingItem[];
    }>;
}
export interface IPricingOption {
    _id: string;
    category: string;
    categoryName: string;
    key: string;
    label: string;
    description: string;
    amount: number;
    currency: string;
    features: string[];
    isPopular: boolean;
    metadata?: Record<string, any>; // Optional because some options might not have it
    isActive: boolean;
    displayOrder: number;
    __v: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

interface ActivePricingResponse {
    success: boolean;
    data: Array<{
        category: string;
        categoryName: string;
        options: IPricingOption[];
    }>;
}
export const adminPricingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getActivePricing: builder.query<ActivePricingResponse, void>({
            query: () => '/pricing/active',
            keepUnusedDataFor: 1800,
            providesTags: ['Pricing'],
        }),
        getPricingByCategory: builder.query<{ success: boolean; data: IPricingOption[] }, string>({
            query: (category) => `/pricing/category/${category}`,
        }),

        // Admin
        getAdminPricing: builder.query<PricingResponse, void>({
            query: () => '/pricing',
            providesTags: ['Pricing'],
        }),

        createPricing: builder.mutation<{ success: boolean; data: IPricingItem }, Partial<IPricingItem>>({
            query: (body) => ({
                url: '/pricing',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Pricing'],
        }),

        updatePricing: builder.mutation<{ success: boolean; data: IPricingItem }, { id: string; data: Partial<IPricingItem> }>({
            query: ({ id, data }) => ({
                url: `/pricing/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Pricing'],
        }),

        togglePricingActive: builder.mutation<{ success: boolean; data: IPricingItem }, string>({
            query: (id) => ({
                url: `/pricing/${id}/toggle`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Pricing'],
        }),

        deletePricing: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/pricing/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Pricing'],
        }),
    }),
});

export const {
    useGetActivePricingQuery,
    useGetPricingByCategoryQuery,
    useGetAdminPricingQuery,
    useCreatePricingMutation,
    useUpdatePricingMutation,
    useTogglePricingActiveMutation,
    useDeletePricingMutation,
} = adminPricingApi;