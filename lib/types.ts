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
	publicId: string;
	name: string;
	image: string;
	address: string;
	phone: string;
	email: string;
	openingHours: OpeningHours;
	deliveryTime:{
		min: number;
		max: number;
	}
	category: string;
	description: string;
	menuItems: any[]; // Replace 'any' with proper type if available
	time: string;
	// Add other required fields
}

export type RestaurantType = {
	name: string; // The name of the restaurant
	address: string; // The address of the restaurant
	category: string; // The category of food (e.g., "Pasta")
	deliveryTime: {
		min: number; // Minimum delivery time (e.g., 11)
		max: number; // Maximum delivery time (e.g., 22)
	}; // Estimated delivery time (e.g., "11-22 mins")
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

export interface AdminRestaurantType {
	publicId: string;
	name: string | undefined;
	image: string | undefined;
	address: string | undefined;
	phone: string | undefined;
	email: string | undefined;
	openingHours: OpeningHours;
	deliveryTime: string | undefined;
	category: string | undefined;
	description: string | undefined;
	menuItems: { name: string; price: number }[];
}

export interface RestaurantFormType {
	name: string;
	image: string;
	address: string;
	phone: string;
	email: string;
	openingHours: OpeningHours;
	deliveryTime: string;
	category: string;
	description: string;
}

export interface MenuItemType {
	available: boolean;
	category: string;
	createdAt: string;
	image: string;
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
	phone: string;
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

export type OpeningHoursType = {
	[day in
		| "sunday"
		| "monday"
		| "tuesday"
		| "wednesday"
		| "thursday"
		| "friday"
		| "saturday"]?: {
		open: string;
		close: string;
		isClosed: boolean;
	};
};

export const defaultOpeningHours: OpeningHours = {
	monday: { open: "10:00", close: "19:00", isClosed: false },
	tuesday: { open: "10:00", close: "19:00", isClosed: false },
	wednesday: { open: "10:00", close: "19:00", isClosed: false },
	thursday: { open: "10:00", close: "19:00", isClosed: false },
	friday: { open: "10:00", close: "19:00", isClosed: false },
	saturday: { open: "10:00", close: "19:00", isClosed: false },
	sunday: { open: "10:00", close: "19:00", isClosed: false },
};

export const parseOpeningHours = (
	hours: string | OpeningHours | undefined,
): OpeningHours => {
	if (typeof hours === "string") {
		try {
			const parsed = JSON.parse(hours);
			if (isValidOpeningHours(parsed)) {
				return parsed;
			}
		} catch (e) {
			console.error("Failed to parse opening hours:", e);
		}
	} else if (isValidOpeningHours(hours)) {
		return hours;
	}
	return defaultOpeningHours;
};

const isValidOpeningHours = (hours: any): hours is OpeningHours => {
	if (!hours || typeof hours !== "object") return false;

	const requiredDays = [
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
		"sunday",
	];
	return requiredDays.every(
		(day) =>
			hours[day] &&
			typeof hours[day].open === "string" &&
			typeof hours[day].close === "string" &&
			typeof hours[day].isClosed === "boolean",
	);
};

// Convert partial restaurant data to required form type
export const toFormType = (
	restaurant: Partial<RestaurantFormType>,
): RestaurantFormType => ({
	name: restaurant.name ?? "",
	image: restaurant.image ?? "",
	address: restaurant.address ?? "",
	phone: restaurant.phone ?? "",
	email: restaurant.email ?? "",
	openingHours: restaurant.openingHours ?? defaultOpeningHours,
	deliveryTime: restaurant.deliveryTime ?? "",
	category: restaurant.category ?? "",
	description: restaurant.description ?? "",
});

export interface RestaurantFormType {
	name: string;
	image: string;
	address: string;
	phone: string;
	email: string;
	openingHours: OpeningHours;
	deliveryTime: string;
	category: string;
	description: string;
}

// Base Menu Item interface with common properties
export interface BaseMenuItem {
	name: string;
	image: string;
	price: string;
	available: boolean;
}

// For displaying menu items in the restaurant page
export interface MenuItemDisplay extends BaseMenuItem {
	_id: string;
	publicId: string;
	categoryId: {
		_id: string;
		name: string;
		slug: string;
	};
	parent: string;
	slug: string;
}

// For admin forms when creating/editing menu items
export interface MenuItemForm extends BaseMenuItem {
	description?: string;
	categoryId: string; // Just the ID when submitting forms
}

// For the full menu item data from API
export interface MenuItemFull extends MenuItemDisplay {
	description?: string;
	createdAt: string;
	updatedAt: string;
	stars?: number;
	isBestSeller?: boolean;
}

// Category types
export interface Category {
	_id: string;
	name: string;
	slug: string;
	description?: string;
	active: boolean;
	categoryType: "restaurant" | "menu";
}

// Rest of your existing types remain the same...



export interface RestaurantQueryParams {
  page?: number;
  perPage?: number;
  search?: string;
  category?: string;
  sort?: string;
}