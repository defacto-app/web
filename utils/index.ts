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


export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};



export const isValidCoordinates = (location?: { lat: number; lng: number }) => {
    if (!location) return false;

    const { lat, lng } = location;

    // Check if coordinates exist and are not zero
    return (lat !== 0 && lng !== 0 && !Number.isNaN(lat) && !Number.isNaN(lng));
};
