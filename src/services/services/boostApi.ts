import { api } from "../_api";

 

export interface BoostResponse {
    success: boolean;
    data?: {
        paymentId: string;
        reference: string;
        amount: number;
        boostKey: string;
        durationDays: number;
        listingTitle: string;
    };
    message?: string;
}

export interface BoostStatus {
    success: boolean;
    data: {
        isBoosted: boolean;
        boostType: string | null;
        remainingDays: number;
        expiresAt: string | null;
        purchasedAt: string | null;
    };
}

export const boostApi = api.injectEndpoints({
    endpoints: (builder) => ({
        initiateBoost: builder.mutation<BoostResponse, { listingId: string; boostKey: string }>({
            query: (body) => ({
                url: '/boost/initiate',
                method: 'POST',
                body,
            }),
        }),
        checkBoostStatus: builder.query<BoostStatus, string>({
            query: (listingId) => `/boost/status/${listingId}`,
        }),
    }),
});

export const {
    useInitiateBoostMutation,
    useCheckBoostStatusQuery,
} = boostApi;