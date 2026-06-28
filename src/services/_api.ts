// services/api.ts

import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [
        // Public
        'User',           // Current user (me)
        'Listings',       // Public browse/search
        'MyListings',     // Seller's listings
        'Brands',         // Public brands
        'Locations',      // Public locations
        'Pricing',        // Public pricing

        // Admin (separate)
        'AdminListings',
        'AdminUsers',
        'AdminStats',
        'AdminInspections',
        'AdminPayments',
        'AdminContacts',
        'AdminPricing',
        'AdminBrands',
        'AdminLocations',
        'AdminSMS',
        'AdminSmsLogs',

        // Shared tags (used by both admin + user)
        'Payments',       // User sees their payments, admin sees all
        'Inspections',    // Seller sees their inspections, admin sees all
        'Uploads',
        'Me',
        'MyLeads',
    ],
    refetchOnMountOrArgChange: true,  // Refetch when component mounts OR params change
    keepUnusedDataFor: 0,            // Don't keep unused data (prevents stale cache across users)
    endpoints: () => ({}),

});

