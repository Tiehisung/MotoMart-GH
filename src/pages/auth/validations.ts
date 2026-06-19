import { EUserRole } from '@/types/user';
import { z } from 'zod';

export const signinSchema = z.object({
    phoneNumber: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^0[0-9]{9}$/, 'Enter a valid Ghana phone number (e.g., 024XXXXXXX)'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name cannot exceed 50 characters'),
        email: z.string().optional(),
        phoneNumber: z
            .string()
            .min(1, 'Phone number is required')
            .regex(/^0[0-9]{9}$/, 'Enter a valid Ghana phone number (e.g., 024XXXXXXX)'),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(50, 'Password cannot exceed 50 characters'),
        role: z.nativeEnum(EUserRole, {
            error: 'Please select a role',
        }).refine((value) => !value.includes('admin'), {
            message: 'Please select a non-admin role',
        }),
    })
    .refine(
        (data) => {
            // If role is seller, email must be provided
            if (data.role === 'seller') {
                return data.email && data.email.trim() !== '';
            }
            return true;
        },
        {
            message: 'Email is required for sellers',
            path: ['email'],
        }
    )
    .refine(
        (data) => {
            // Validate email format if email is provided
            if (data.email && data.email.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(data.email);
            }
            return true;
        },
        {
            message: 'Please enter a valid email address',
            path: ['email'],
        }
    );

export type ISigninFormData = z.infer<typeof signinSchema>;
export type IRegisterFormData = z.infer<typeof registerSchema>;