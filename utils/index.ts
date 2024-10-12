// utils/formatPrice.ts

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
    }).format(price);
};


export const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength
        ? `${text.substring(0, maxLength)}...`
        : text;
};