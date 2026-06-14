import { IQueryResponse } from '@/types';
import { api } from './_api';

export interface IContactFormData {
    fullName: string;
    phoneNumber: string;
    email?: string;
    inquiryType: string;
    message?: string;
}
export interface IContactMessage {
    _id: string;
    fullName: string;
    phoneNumber: string;
    email?: string;
    inquiryType: string;
    message?: string;
    status: 'new' | 'read' | 'replied' | 'closed';
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export const contactApi = api.injectEndpoints({
    endpoints: (builder) => ({
        submitContact: builder.mutation<IQueryResponse<{
            id: string;
            fullName: string;
            inquiryType: string;
            createdAt: string;
        }>, IContactFormData>({
            query: (body) => ({
                url: '/contact',
                method: 'POST',
                body,
            }),
        }),

        //============= ADMIN =====================================
        // Get all contacts
        getAdminContacts: builder.query<IQueryResponse<IContactMessage[]>, Record<string, any>>({
            query: (params) => ({ url: '/admin/contacts', params }),
            providesTags: ['AdminContacts'],
        }),

        // Get single contact
        getAdminContact: builder.query<{ success: boolean; data: IContactMessage }, string>({
            query: (id) => `/admin/contacts/${id}`,
            providesTags: (_r, _e, id) => [{ type: 'AdminContacts', id }],
        }),

        // Update contact status
        updateContactStatus: builder.mutation<
            { success: boolean; message: string; data: IContactMessage },
            { id: string; status: string; notes?: string }
        >({
            query: ({ id, ...body }) => ({
                url: `/admin/contacts/${id}/status`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['AdminContacts'],
        }),

        // Delete contact
        deleteContact: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/admin/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['AdminContacts'],
        }),
    }),
});

export const {
    useSubmitContactMutation,
    useDeleteContactMutation,
    useGetAdminContactQuery,
    useGetAdminContactsQuery,
    useUpdateContactStatusMutation,

} = contactApi;