import { useMemo } from 'react';
import { useGetActivePricingQuery } from '@/services/pricingApi';

export interface IPricingOption {
    key: string;
    label: string;
    description: string;
    amount: number;
    currency: string;
    features: string[];
    isPopular: boolean;
    metadata?: Record<string, any>;
}

interface PricingCategory {
    category: string;
    categoryName: string;
    options: IPricingOption[];
}

export const usePricing = () => {
    const { data, isLoading } = useGetActivePricingQuery();

    const categories = useMemo((): Record<string, PricingCategory> => {
        if (!data?.data) return {};

        return data.data.reduce((acc, cat) => {
            acc[cat.category] = {
                category: cat.category,
                categoryName: cat.categoryName,
                options: [...cat.options].sort((a, b) =>
                    (a.metadata?.displayOrder || 0) - (b.metadata?.displayOrder || 0)
                ),
            };
            return acc;
        }, {} as Record<string, PricingCategory>);
    }, [data]);

    // ============================================
    // SHORTCUT GETTERS
    // ============================================
    const listingFeeOptions = categories['listing_fee']?.options || [];
    const featuredBoostOptions = categories['featured_boost']?.options || [];
    const verificationOptions = categories['verification']?.options || [];


    const getPrice = (category: string, key: string): number => {
        const option = categories[category]?.options.find(o => o.key === key);
        return option?.amount ?? 0;
    };

    const getOption = (category: string, key: string): IPricingOption | undefined => {
        return categories[category]?.options.find(o => o.key === key);
    };

    return {
        categories,
        isLoading,
        listingFeeOptions,
        featuredBoostOptions, 
        verificationOptions,
        getPrice,
        getOption,
        // Direct prices with fallbacks
        standardListingPrice: getPrice('listing_fee', 'standard') || 25,
        premiumListingPrice: getPrice('listing_fee', 'premium') || 40,
        boost7DayPrice: getPrice('featured_boost', '7day') || 15,
        boost30DayPrice: getPrice('featured_boost', '30day') || 35,
        verificationPrice: getPrice('verification', 'physical') || 60,
    };
};