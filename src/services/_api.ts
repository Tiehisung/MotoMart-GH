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
        'User', 'Users', 'Listings', 'MyListings', 'Payments',
        'Inspections', 'Uploads', 'Me', 'Brands', 'Locations','AdminContacts'
    ],
    refetchOnMountOrArgChange: true,  // Refetch when component mounts OR params change
    keepUnusedDataFor: 0,            // Don't keep unused data (prevents stale cache across users)
    endpoints: () => ({}),

});

