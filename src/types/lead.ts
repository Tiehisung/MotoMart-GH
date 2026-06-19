import { IListing } from "./listing";
import { IUser } from "./user";

export interface ILead {
    _id: string
    listing: string|IListing;
    buyer: IUser;
    seller: IUser;
    buyerPhone: string;
    sellerPhone: string;
    smsSent: boolean;
    smsMessageId?: string;
    smsError?: string;
    status: `${ELeadStatus}`;
    notifications: INotificationResult[]
    createdAt: Date;
    updatedAt: Date;
}

export enum ELeadStatus {
    PENDING = 'pending',       // Just created, notifying...
    CONTACTED = 'contacted',   // Seller called the buyer
}

export enum ENotificationChannel {
    SMS = 'sms',
    EMAIL = 'email',
    DASHBOARD = 'dashboard',
}
export interface INotificationResult {
    channel: `${ENotificationChannel}`;
    success: boolean;
    messageId?: string;
    error?: string;
}