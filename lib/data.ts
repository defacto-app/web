// data.ts
import type { Restaurant } from "@/lib/types";

export const restaurants: Restaurant[] = [
	{
		id: "1",
		name: "Cold Stone Creamery",
		time: "5-20 mins",
		image: "/rest/cold.jpg",
		background: "/rest/cold.jpg",
		distance: "2.8KM",
		fee: "$2.00",
		hours: "8am-9pm, Monday to Saturday",
		isBestSeller: false,
		products: [],
		categories: {
			"For You": [
				{
					id: "1",
					name: "Mixed Vegetable Salad",
					description: "Fresh veggies with a touch of dressing.",
					price: "₦5,000",
					imageUrl: "/rest/ms.jpg",
					stars: 5,
					isBestSeller: true,
				},
				{
					id: "2",
					name: "Fruit & Spice Salad",
					description: "A delightful mix of fruits and spices.",
					price: "₦5,000",
					imageUrl: "/rest/fs.jpg",
					stars: 5,
					isBestSeller: true,
				},
			],
			Deserts: [
				{
					id: "3",
					name: "Ice Cream",
					description: "Cold and sweet ice cream.",
					price: "₦3,000",
					imageUrl: "/rest/ic.jpg",
					stars: 5,
					isBestSeller: false,
				},
				{
					id: "4",
					name: "Chocolate Cake",
					description: "Rich chocolate cake with layers.",
					price: "₦4,000",
					imageUrl: "/rest/ic.jpg",

					stars: 5,
					isBestSeller: false,
				},
			],
			Drinks: [
				{
					id: "5",
					name: "Smoothie",
					description: "Refreshing fruit smoothie.",
					price: "₦2,000",
					imageUrl: "/rest/sm.jpg",
					stars: 4,
					isBestSeller: false,
				},
				{
					id: "6",
					name: "Milkshake",
					description: "Creamy milkshake with various flavors.",
					price: "₦2,500",
					imageUrl: "/rest/milks.jpg",
					stars: 5,
					isBestSeller: true,
				},
			],
		},
	},
	{
		id: "2",
		name: "Mr.Biggs",
		time: "5-20 mins",
		image: "/rest/biggs.jpg",
		background: "/rest/biggs.jpg",
		distance: "3.2KM",
		fee: "$1.50",
		hours: "8am-10pm, Monday to Sunday",
		isBestSeller: false,
		products: [],
		categories: {
			"For You": [
				{
					id: "7",
					name: "Chicken Salad",
					description: "Grilled chicken with fresh greens.",
					price: "₦4,500",
					imageUrl: "/rest/milks.jpg",

					isBestSeller: true,
				},
				{
					id: "8",
					name: "Veggie Delight",
					description: "A mix of seasonal vegetables.",
					price: "₦4,000",
					imageUrl: "/rest/milks.jpg",

					isBestSeller: false,
				},
			],
			Deserts: [
				{
					id: "9",
					name: "Pastry",
					description: "Freshly baked pastry.",
					price: "₦1,500",
					imageUrl: "/rest/sm.jpg",

					isBestSeller: false,
				},
				{
					id: "10",
					name: "Cupcake",
					description: "Delicious cupcake with frosting.",
					price: "₦1,200",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: false,
				},
			],
			Drinks: [
				{
					id: "11",
					name: "Soda",
					description: "Chilled soda drink.",
					price: "₦800",
					imageUrl: "/rest/milks.jpg",

					isBestSeller: false,
				},
				{
					id: "12",
					name: "Iced Tea",
					description: "Refreshing iced tea.",
					price: "₦1,000",
					imageUrl: "/rest/milks.jpg",

					isBestSeller: false,
				},
			],
		},
	},
	{
		id: "3",
		name: "Chicken Republic",
		time: "10-30 mins",
		image: "/rest/chickenrep.jpg",
		background: "/rest/chickenrep.jpg",
		distance: "1.8KM",
		fee: "$2.00",
		hours: "9am-9pm, Monday to Saturday",
		isBestSeller: false,
		products: [],
		categories: {
			"For You": [
				{
					id: "13",
					name: "Spicy Chicken Salad",
					description: "Spicy grilled chicken with mixed greens.",
					price: "₦5,500",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: true,
				},
				{
					id: "14",
					name: "Caesar Salad",
					description: "Classic Caesar salad with a creamy dressing.",
					price: "₦5,000",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: true,
				},
			],
			Deserts: [
				{
					id: "15",
					name: "Brownie",
					description: "Chocolate brownie with nuts.",
					price: "₦2,000",
					imageUrl: "/rest/fs.jpg",

					stars: 4,
					isBestSeller: false,
				},
				{
					id: "16",
					name: "Cheesecake",
					description: "Creamy cheesecake with a graham crust.",
					price: "₦3,500",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: false,
				},
			],
			Drinks: [
				{
					id: "17",
					name: "Lemonade",
					description: "Freshly squeezed lemonade.",
					price: "₦1,500",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: false,
				},
				{
					id: "18",
					name: "Coffee",
					description: "Hot brewed coffee.",
					price: "₦1,000",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: false,
				},
			],
		},
	},
	{
		id: "4",
		name: "KFC",
		time: "5-20 mins",
		image: "/rest/kfc1.jpg",
		background: "/rest/kfc1.jpg",
		distance: "2.0KM",
		fee: "$1.00",
		hours: "10am-10pm, Monday to Sunday",
		isBestSeller: false,
		products: [],
		categories: {
			"For You": [
				{
					id: "19",
					name: "Zinger Salad",
					description: "Crispy zinger chicken with fresh veggies.",
					price: "₦6,000",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: true,
				},
				{
					id: "20",
					name: "Coleslaw",
					description: "Classic KFC coleslaw.",
					price: "₦2,000",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: true,
				},
			],
			Deserts: [
				{
					id: "21",
					name: "Apple Pie",
					description: "Warm apple pie.",
					price: "₦2,500",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: false,
				},
				{
					id: "22",
					name: "Chocolate Sundae",
					description: "Sundae with chocolate sauce.",
					price: "₦2,000",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: false,
				},
			],
			Drinks: [
				{
					id: "23",
					name: "Pepsi",
					description: "Chilled Pepsi drink.",
					price: "₦800",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: false,
				},
				{
					id: "24",
					name: "Iced Coffee",
					description: "Refreshing iced coffee.",
					price: "₦1,500",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: false,
				},
			],
		},
	},
	{
		id: "5",
		name: "Dominos Pizza",
		time: "10-30 mins",
		image: "/rest/dominos.jpg",
		background: "/rest/dominos.jpg",
		distance: "1.5KM",
		fee: "$2.00",
		hours: "9am-10pm, Monday to Sunday",
		isBestSeller: false,
		products: [],
		categories: {
			"For You": [
				{
					id: "25",
					name: "Pepperoni Pizza",
					description: "Classic pepperoni pizza with mozzarella cheese.",
					price: "₦8,000",
					imageUrl: "/rest/fs.jpg",

					stars: 5,
					isBestSeller: true,
				},
				{
					id: "26",
					name: "Veggie Pizza",
					description: "Pizza loaded with fresh vegetables.",
					price: "₦7,500",
					imageUrl: "/rest/fs.jpg",

					stars: 5,
					isBestSeller: true,
				},
			],
			Deserts: [
				{
					id: "27",
					name: "Chocolate Lava Cake",
					description: "Warm chocolate cake with a gooey center.",
					price: "₦4,000",
					imageUrl: "/rest/fs.jpg",

					stars: 5,
					isBestSeller: false,
				},
				{
					id: "28",
					name: "Cinnamon Sticks",
					description: "Sweet cinnamon sticks with icing dip.",
					price: "₦3,000",
					imageUrl: "/rest/fs.jpg",

					stars: 4,
					isBestSeller: false,
				},
			],
			Drinks: [
				{
					id: "29",
					name: "Coca Cola",
					description: "Chilled Coca Cola drink.",
					price: "₦900",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: false,
				},
				{
					id: "30",
					name: "Sprite",
					description: "Refreshing Sprite drink.",
					price: "₦900",
					imageUrl: "/rest/fs.jpg",

					isBestSeller: false,
				},
			],
		},
	},
];

export const predictionJson = {
	predictions: [
		{
			description: "Life Camp Roundabout, Abuja, Nigeria",
			matched_substrings: [
				{
					length: 8,
					offset: 0,
				},
			],
			place_id: "ChIJ4YggG8J1ThARTOPg4BU9rkY",
			reference: "ChIJ4YggG8J1ThARTOPg4BU9rkY",
			structured_formatting: {
				main_text: "Life Camp Roundabout",
				main_text_matched_substrings: [
					{
						length: 8,
						offset: 0,
					},
				],
				secondary_text: "Abuja, Nigeria",
			},
			terms: [
				{
					offset: 0,
					value: "Life Camp Roundabout",
				},
				{
					offset: 22,
					value: "Abuja",
				},
				{
					offset: 29,
					value: "Nigeria",
				},
			],
			types: ["establishment", "point_of_interest"],
		},
		{
			description: "Life camps, Abuja, Nigeria",
			matched_substrings: [
				{
					length: 8,
					offset: 0,
				},
			],
			place_id: "ChIJv9xFJkd1ThARePTL0Z_UQkc",
			reference: "ChIJv9xFJkd1ThARePTL0Z_UQkc",
			structured_formatting: {
				main_text: "Life camps",
				main_text_matched_substrings: [
					{
						length: 8,
						offset: 0,
					},
				],
				secondary_text: "Abuja, Nigeria",
			},
			terms: [
				{
					offset: 0,
					value: "Life camps",
				},
				{
					offset: 12,
					value: "Abuja",
				},
				{
					offset: 19,
					value: "Nigeria",
				},
			],
			types: ["lodging", "establishment", "point_of_interest"],
		},
		{
			description: "Lifecamp Road, Abuja, Nigeria",
			matched_substrings: [
				{
					length: 13,
					offset: 0,
				},
			],
			place_id:
				"Eh1MaWZlY2FtcCBSb2FkLCBBYnVqYSwgTmlnZXJpYSIuKiwKFAoSCfubECfddE4QETYmkCoZ8W2mEhQKEgnZL9ZMX3ROEBEroQ6itBe9Uw",
			reference:
				"Eh1MaWZlY2FtcCBSb2FkLCBBYnVqYSwgTmlnZXJpYSIuKiwKFAoSCfubECfddE4QETYmkCoZ8W2mEhQKEgnZL9ZMX3ROEBEroQ6itBe9Uw",
			structured_formatting: {
				main_text: "Lifecamp Road",
				main_text_matched_substrings: [
					{
						length: 13,
						offset: 0,
					},
				],
				secondary_text: "Abuja, Nigeria",
			},
			terms: [
				{
					offset: 0,
					value: "Lifecamp Road",
				},
				{
					offset: 15,
					value: "Abuja",
				},
				{
					offset: 22,
					value: "Nigeria",
				},
			],
			types: ["geocode", "route"],
		},
		{
			description: "Life Camp Hotel, Ecowas Road, Accra, Ghana",
			matched_substrings: [
				{
					length: 8,
					offset: 0,
				},
			],
			place_id: "ChIJsxxVqaqd3w8RjVI3JNaDKe0",
			reference: "ChIJsxxVqaqd3w8RjVI3JNaDKe0",
			structured_formatting: {
				main_text: "Life Camp Hotel",
				main_text_matched_substrings: [
					{
						length: 8,
						offset: 0,
					},
				],
				secondary_text: "Ecowas Road, Accra, Ghana",
			},
			terms: [
				{
					offset: 0,
					value: "Life Camp Hotel",
				},
				{
					offset: 17,
					value: "Ecowas Road",
				},
				{
					offset: 30,
					value: "Accra",
				},
				{
					offset: 37,
					value: "Ghana",
				},
			],
			types: ["establishment", "lodging", "point_of_interest"],
		},
		{
			description:
				"Life Camp Quarters, Tajudeen Kotun Crescent, Abuja, Nigeria",
			matched_substrings: [
				{
					length: 8,
					offset: 0,
				},
			],
			place_id: "ChIJ7Zr1iA51ThAR8l1cAAYCE2Y",
			reference: "ChIJ7Zr1iA51ThAR8l1cAAYCE2Y",
			structured_formatting: {
				main_text: "Life Camp Quarters",
				main_text_matched_substrings: [
					{
						length: 8,
						offset: 0,
					},
				],
				secondary_text: "Tajudeen Kotun Crescent, Abuja, Nigeria",
			},
			terms: [
				{
					offset: 0,
					value: "Life Camp Quarters",
				},
				{
					offset: 20,
					value: "Tajudeen Kotun Crescent",
				},
				{
					offset: 45,
					value: "Abuja",
				},
				{
					offset: 52,
					value: "Nigeria",
				},
			],
			types: ["point_of_interest", "establishment", "lodging"],
		},
	],
	status: "OK",
};
