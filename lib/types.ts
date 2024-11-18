export interface MenuItem {
	id: string;
	name: string;
	description: string;
	price: string;
	stars: number;
	imageUrl: string;
	isBestSeller: boolean;
}

export interface Restaurant {
	id: string;
	name: string;
	time: string;
	image: string;
	background: string;
	distance: string;
	fee: string;
	hours: string;
	isBestSeller: boolean;
	categories: any;

	products: {
		id: string;
		name: string;
		price: string;
	}[];
}

export type RestaurantType = {
	name: string; // The name of the restaurant
	address: string; // The address of the restaurant
	category: string; // The category of food (e.g., "Pasta")
	deliveryTime: string; // Estimated delivery time (e.g., "11-22 mins")
	email: string; // Email address of the restaurant
	phone: string; // Phone number of the restaurant
	image: string; // URL of the restaurant's image
	openingHours: string; // The restaurant's opening hours
	publicId: string; // Public ID for the restaurant (possibly for image or other resources)
	rating: number; // The restaurant's rating (e.g., 4.4)
	slug: string; // URL-friendly identifier for the restaurant
	createdAt: string; // ISO 8601 date string representing when the restaurant was created
	updatedAt: string; // ISO 8601 date string representing when the restaurant was last updated
};

export interface RestaurantFormType {
	name: string;
	deliveryTime: string;
	category: string;
	image: string;
	address: string;
	phone: string;
	email: string;
	openingHours: string;
	publicId: string;
	menuItems: any[]; // Add more specific typing if you know the structure of getMenu items
}

export interface MenuItemType {
	available: boolean;
	category: string;
	createdAt: string;
	image: string;
	menuType: string;
	name: string;
	parent: string;
	price: string;
	publicId: string;
	slug: string;
	updatedAt: string;
}

export interface addressSelectionType {
	location: {
		lat: number;
		lng: number;
	};
	address: string;
	additionalDetails: string;
}

interface Address {
	address: string;
	additionalDetails: string;
	location: {
		lat: number;
		lng: number;
	};
}

interface DropOffDetails {
	address: Address;
	name: string;
	phone?: string;
	email?: string;
}

export interface DeliveryPayloadType {
	description: string;
	package_image: string;
	charge: number;
	pickupDate: Date;
	pickupDetails: {
		address: Address;
	};
	dropOffDetails: DropOffDetails;
}


export type DayHours = {
	open: string;
	close: string;
	isClosed: boolean;
};

export type OpeningHours = {
	monday: DayHours;
	tuesday: DayHours;
	wednesday: DayHours;
	thursday: DayHours;
	friday: DayHours;
	saturday: DayHours;
	sunday: DayHours;
};