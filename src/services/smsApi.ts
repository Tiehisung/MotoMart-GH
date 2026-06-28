import { api } from "./_api";



interface SmsBalanceResponse {
    success: boolean;
    data?: {
        balance: string;
        countryCode: string;
        isSandbox: boolean;
    };
    message?: string;
}

interface TestSmsResponse {
    success: boolean;
    data?: {
        smsSent: boolean;
        messageId?: string;
        recipients?: number;
        details?: any;
        isSandbox: boolean;
    };
    message?: string;
}

export const adminSmsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSmsBalance: builder.query<SmsBalanceResponse, void>({
            query: () => '/sms/balance',
            providesTags: ['AdminSMS'],
        }),
        sendTestSms: builder.mutation<TestSmsResponse, { phone: string; message?: string }>({
            query: (body) => ({
                url: '/sms/test',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['AdminSMS'],
        }),
    }),
});

export const {
    useGetSmsBalanceQuery,
    useSendTestSmsMutation,
} = adminSmsApi;