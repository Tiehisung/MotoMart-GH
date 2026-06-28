import { api } from './_api';

export const adminApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // ============================================
        // DASHBOARD
        // ============================================
        getDashboardStats: builder.query<any, void>({
            query: () => '/admin/stats',
            providesTags: ['AdminStats'],
        }),

        // ============================================
        // LISTINGS
        // ============================================
        getPendingListings: builder.query<any, Record<string, any>>({
            query: (params) => ({ url: '/admin/listings/pending', params }),
            providesTags: ['AdminListings'],
        }),
        approveListing: builder.mutation<any, string>({
            query: (id) => ({ url: `/admin/listings/${id}/approve`, method: 'PUT' }),
            invalidatesTags: ['AdminListings', 'AdminStats', 'Listings'],
        }),
        rejectListing: builder.mutation<any, { id: string; reason: string }>({
            query: ({ id, reason }) => ({
                url: `/admin/listings/${id}/reject`,
                method: 'PUT',
                body: { reason },
            }),
            invalidatesTags: ['AdminListings', 'AdminStats', 'Listings'],
        }),

        // ============================================
        // USERS
        // ============================================
        getPendingUsers: builder.query<any, void>({
            query: () => '/admin/users/pending',
            providesTags: ['AdminUsers'],
        }),
        verifyUser: builder.mutation<any, string>({
            query: (id) => ({ url: `/admin/users/${id}/verify`, method: 'PUT' }),
            invalidatesTags: ['AdminUsers', 'AdminStats'],
        }),

        // ============================================
        // INSPECTIONS
        // ============================================
        getPendingInspections: builder.query<any, void>({
            query: () => '/admin/inspections/pending',
            providesTags: ['AdminInspections'],
        }),
        completeInspection: builder.mutation<any, { id: string } & Record<string, any>>({
            query: ({ id, ...body }) => ({
                url: `/admin/inspections/${id}/complete`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['AdminInspections', 'AdminStats'],
        }),

        // ============================================
        // PAYMENTS
        // ============================================
        getAllPayments: builder.query<any, Record<string, any>>({
            query: (params) => ({ url: '/admin/payments', params }),
            providesTags: ['AdminPayments'],
        }),
    }),
});

export const {
    useGetDashboardStatsQuery,
    useGetPendingListingsQuery,
    useApproveListingMutation,
    useRejectListingMutation,
    useGetPendingUsersQuery,
    useVerifyUserMutation,
    useGetPendingInspectionsQuery,
    useCompleteInspectionMutation,
    useGetAllPaymentsQuery,
} = adminApi;