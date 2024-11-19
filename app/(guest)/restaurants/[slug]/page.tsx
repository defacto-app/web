"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MapPin, Clock1, ThumbsUp } from "lucide-react";

function RestaurantPage({ params }: { params: { slug: string } }) {
	const [restaurant, setRestaurant] = useState<any>(null);
	const [menu, setMenu] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState("");
	const [activeSection, setActiveSection] = useState("All");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await $api.guest.restaurant.one(params.slug);
				setRestaurant(res.data.restaurant);
				setMenu(res.data.menu);
			} catch (e) {
				setError("Failed to load restaurant data");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [params.slug]);

	const sections = [
		"All",
		...Array.from(new Set(menu.map((item) => item.menuType))),
	];

	const filteredMenu = menu.filter((item) => {
		const matchesSearch = item.name
			.toLowerCase()
			.includes(search.toLowerCase());
		return activeSection === "All"
			? matchesSearch
			: matchesSearch && item.menuType === activeSection;
	});

	if (loading || !restaurant) return null;
	if (error) return <div className="text-red-500">{error}</div>;

	return (
		<div className="min-h-screen bg-gray-50">
			<BreadcrumbNav restaurantName={restaurant.name} />
			<RestaurantHero
				image={restaurant.image}
				name={restaurant.name}
				deliveryTime={restaurant.deliveryTime}
				address={restaurant.address}
			/>

			<div className="container mx-auto px-4 lg:px-6 py-6">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					{/* Sidebar */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg shadow-sm">
							<div className="p-4">
								<h2 className="text-lg font-semibold">Sections</h2>
							</div>
							<div className="flex lg:flex-col gap-1 p-2 overflow-x-auto lg:overflow-x-visible">
								{sections.map((section) => (
									// biome-ignore lint/a11y/useButtonType: <explanation>
									<button
										key={section}
										onClick={() => setActiveSection(section)}
										className={cn(
											"px-4 py-2 rounded-md text-sm whitespace-nowrap w-full text-left",
											activeSection === section
												? "bg-blue-50 text-blue-600"
												: "hover:bg-gray-50",
										)}
									>
										{section}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="lg:col-span-7">
						<SearchBar
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder={`Search in ${restaurant.name}`}
						/>
						<div className="mt-4">
							<MenuArea data={filteredMenu} />
						</div>
					</div>

					{/* Cart */}
					<div className="hidden lg:block lg:col-span-3">
						<div className="sticky top-4">
							<OrderCart restaurant_name={restaurant.name} />
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Cart */}
			<div className="lg:hidden fixed bottom-4 right-4 z-50">
				<OrderCart buttonOnly restaurant_name={restaurant.name} />
			</div>
		</div>
	);
}

export default RestaurantPage;

// components/restaurant/BreadcrumbNav.tsx
import Link from "next/link";

const BreadcrumbNav = ({ restaurantName }: { restaurantName: string }) => (
	<nav className="px-4 py-2 bg-white border-b overflow-x-auto">
		<div className="max-w-7xl mx-auto flex gap-2 text-sm">
			<Link href="/" className="text-gray-500">
				Home
			</Link>
			<span className="text-gray-400">/</span>
			<Link href="/restaurants" className="text-gray-500">
				Restaurants
			</Link>
			<span className="text-gray-400">/</span>
			<span className="text-gray-900">{restaurantName}</span>
		</div>
	</nav>
);

interface RestaurantHeroProps {
	image: string;
	name: string;
	deliveryTime: string;
	address: string;
}

const RestaurantHero = ({
	image,
	name,
	deliveryTime,
	address,
}: RestaurantHeroProps) => (
	<div className="relative h-[200px] md:h-[280px] bg-gray-900">
		<Image
			src={image}
			alt={name}
			fill
			className="object-cover opacity-60"
			priority
		/>
		<div className="absolute inset-0 flex items-center px-4">
			<div className="max-w-7xl mx-auto w-full">
				<div className="flex items-center gap-4 md:gap-6">
					<div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg overflow-hidden flex-shrink-0">
						<Image
							src={image}
							alt={name}
							width={128}
							height={128}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="text-white">
						<h1 className="text-xl md:text-3xl font-bold mb-2">{name}</h1>
						<div className="flex flex-wrap gap-3 md:gap-6 items-center text-sm md:text-base">
							<div className="flex items-center gap-1">
								<ThumbsUp className="w-4 h-4 text-green-400" />
								<span>95%</span>
							</div>
							<div className="flex items-center gap-1">
								<Clock1 className="w-4 h-4" />
								<span>{deliveryTime}</span>
							</div>
							<div className="flex items-center gap-1">
								<MapPin className="w-4 h-4" />
								<span className="line-clamp-1">{address}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

interface MenuSectionsProps {
	sections: string[];
	activeSection: string;
	onSectionChange: (section: string) => void;
}

const MenuSections = ({
	sections,
	activeSection,
	onSectionChange,
}: MenuSectionsProps) => (
	<div className="w-full md:w-64 flex-shrink-0 order-2 md:order-1">
		<div className="bg-white rounded-lg p-4 border sticky top-4">
			<h2 className="font-semibold mb-4">Sections</h2>
			<div className="flex md:block gap-2 overflow-x-auto pb-2 md:pb-0">
				{sections.map((section) => (
					// biome-ignore lint/a11y/useButtonType: <explanation>
					<button
						key={section}
						onClick={() => onSectionChange(section)}
						className={cn(
							"px-3 py-2 rounded-md whitespace-nowrap",
							activeSection === section
								? "bg-blue-50 text-blue-600"
								: "hover:bg-gray-50",
						)}
					>
						{section}
					</button>
				))}
			</div>
		</div>
	</div>
);

// components/restaurant/SearchBar.tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { $api } from "@/http/endpoints";
import OrderCart from "@/app/user/checkout/OrderCart";
import MenuArea from "@/app/(guest)/restaurants/components/MenuArea";

interface SearchBarProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
}

const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => (
	<div className="sticky top-0 bg-gray-50 z-10 py-4">
		<div className="relative">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
			<Input
				variant={`rounded`}
				className="pl-10"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	</div>
);
