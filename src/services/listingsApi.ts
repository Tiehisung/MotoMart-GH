import { IListing } from '@/types/listing';
import { api } from './_api';
import { IPagination, IQueryResponse } from '@/types';
import { ILead } from '@/types/lead';

interface IListingsResponse {
    success: boolean;
    count: number;
    data: IListing[];
    pagination?: IPagination;
}

interface ISingleListingResponse {
    success: boolean;
    data: IListing;
}

export const listingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getListings: builder.query<IListingsResponse, Record<string, any>>({
            query: (params) => ({ url: '/listings', params }),
            providesTags: ['Listings'],
        }),
        getListing: builder.query<ISingleListingResponse, string>({
            query: (id) => `/listings/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Listings', id }],
        }),

        // Seller
        getMyListings: builder.query<IListingsResponse, Record<string, any>>({
            query: (params) => ({ url: '/listings/user/mine', params }),
            providesTags: ['MyListings'],
        }),

        createListing: builder.mutation<ISingleListingResponse, FormData | any>({
            query: (body) => ({ url: '/listings', method: 'POST', body }),
            invalidatesTags: ['Listings', 'MyListings'],
        }),
        updateListing: builder.mutation<ISingleListingResponse, { id: string; data: any }>({
            query: ({ id, data }) => ({ url: `/listings/${id}`, method: 'PUT', body: data }),
            invalidatesTags: ['Listings', 'MyListings'],
        }),
        deleteListing: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({ url: `/listings/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Listings', 'MyListings'],
        }),
        markAsSold: builder.mutation<ISingleListingResponse, string>({
            query: (id) => ({ url: `/listings/${id}/mark-sold`, method: 'PATCH' }),
            invalidatesTags: ['Listings', 'MyListings'],
        }),
        uploadListingImages: builder.mutation<any, { id: string; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/listings/${id}/images`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Listings'],
        }),

        /**
         * @deprecated Deprecated endpoint. Now using requestCall
         */
        contactSeller: builder.mutation<IQueryResponse<{
            sellerName: string,
            sellerPhone: string,
            listingTitle: string,
        }>, string>({
            query: (id) => ({ url: `/listings/${id}/contact`, method: 'POST' }),
        }),

        // Buyer
        getMyRequests: builder.query<IListingsResponse, Record<string, any>>({
            query: (params) => ({
                url: '/listings/requests/mine', params
            }),
            providesTags: ['Listings', 'Leads'],
        }),
        checkRequestStatus: builder.query<IQueryResponse<ILead>, string>({
            query: (listingId) => ({
                url: `/listings/${listingId}/requests/check-status`
            }),
            providesTags: ['Listings', 'Leads', 'MyLeads'],
        }),
        requestSellerCall: builder.mutation<any, { listingId: string; buyerPhone: string }>({
            query: ({ listingId, buyerPhone }) => ({
                url: `/listings/${listingId}/request-call`,
                method: 'POST',
                body: { buyerPhone },
                invalidatesTags: ['Listings', 'Leads', 'MyLeads'],
            }),
        }),

        // Seller
        getMyLeads: builder.query<IQueryResponse<ILead[]> & {
            stats: {
                total: number;
                new: any;
                notified: any;
                contacted: any;
            }
        }, Record<string, any>>({
            query: (params) => ({ url: '/listings/leads/mine', params }),
            providesTags: ['MyLeads'],
        }),

        markLeadContacted: builder.mutation<any, string>({
            query: (id) => ({ url: `/listings/leads/${id}/contacted`, method: 'PATCH' }),
            invalidatesTags: ['MyLeads'],
        }),


    }),
});

export const {
    useGetListingsQuery,
    useGetListingQuery,
    useGetMyListingsQuery,
    useCreateListingMutation,
    useUpdateListingMutation,
    useDeleteListingMutation,
    useMarkAsSoldMutation,
    useUploadListingImagesMutation,
    useContactSellerMutation,

    //Buyer
    useRequestSellerCallMutation,
    useGetMyRequestsQuery,
    useCheckRequestStatusQuery,

    // Seller
    useGetMyLeadsQuery,
    useMarkLeadContactedMutation,
} = listingsApi;