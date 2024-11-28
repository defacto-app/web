import Link from "next/link";
import Image from "next/image";
import {
	AlertCircle,
	Clock1,
	MapPin,
	Search,
	ThumbsUp,
	Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/utils/cn";

import type { MenuItemDisplay, OpeningHours } from "@/lib/types";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export const BreadcrumbNav = ({
	restaurantName,
}: { restaurantName: string }) => (
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
	isOpen: boolean;
}

export const RestaurantHero = ({
	image,
	isOpen,
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
						<RestaurantStatus isOpen={isOpen} />

					</div>

				</div>
			</div>
		</div>
	</div>
);



export const LoadingState = () => (
	<div className="min-h-screen bg-gray-50 p-4">
		<div className="space-y-4">
			<Skeleton className="h-[280px] w-full" />
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				<div className="lg:col-span-2">
					<Skeleton className="h-[200px] w-full" />
				</div>
				<div className="lg:col-span-7 space-y-4">
					<Skeleton className="h-12 w-full" />
					{[1, 2, 3].map((n) => (
						<Skeleton key={n} className="h-24 w-full" />
					))}
				</div>
			</div>
		</div>
	</div>
);

export const ErrorState = ({ error }: { error: string }) => (
	<div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
		<Alert variant="destructive">
			<AlertCircle className="h-4 w-4" />
			<AlertDescription>{error}</AlertDescription>
		</Alert>
	</div>
);



interface MenuSectionsProps {
	categories: any[];
	activeCategory: string;
	setActiveCategory: (categoryId: string) => void;
}

interface MenuSectionsProps {
	categories: any[];
	activeCategory: string;
	setActiveCategory: (categoryId: string) => void;
}

export const MenuSections = ({
	categories,
	activeCategory,
	setActiveCategory,
}: MenuSectionsProps) => {
	const handleCategoryClick = (categoryId: string) => {
		setActiveCategory(categoryId);

		if (categoryId === "All") {
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}

		const element = document.getElementById(`category-${categoryId}`);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-sm">
			{/* Title - Hidden on mobile */}
			<div className="p-4 hidden lg:block">
				<h2 className="text-lg font-semibold">Categories</h2>
			</div>

			{/* Categories - Sticky on mobile */}
			<div
				className={cn(
					"flex gap-1 p-2 overflow-x-auto",
					// Mobile styles
					"lg:flex-col lg:overflow-x-visible",
					// Sticky on mobile
					"sticky top-0 bg-white z-20 lg:relative lg:top-auto",
				)}
			>
				{categories.map((category) => (
					<button
						key={category._id}
						type="button"
						onClick={() => handleCategoryClick(category._id)}
						className={cn(
							"px-4 py-2 rounded-md text-sm whitespace-nowrap",
							"flex-shrink-0 lg:w-full lg:text-left", // Prevent shrinking on mobile
							activeCategory === category._id
								? "bg-blue-50 text-blue-600"
								: "hover:bg-gray-50",
						)}
					>
						{category.name}
					</button>
				))}
			</div>
		</div>
	);
};

interface OpeningHoursProps {
	openingHours: OpeningHours;
}

export const OpeningHourComponent = ({ openingHours }: OpeningHoursProps) => (
	<div className="mt-4 bg-white rounded-lg shadow-sm ">
		<div className={`hidden lg:block`}>
			<div className="p-4">
				<h2 className="text-lg font-semibold">Opening Hours</h2>
			</div>
			<div className="p-4 space-y-2">
				{Object.entries(openingHours).map(([day, hours]) => (
					<div key={day} className="flex justify-between text-sm">
						<span className="capitalize">{day}</span>
						<span className={cn(hours.isClosed && "text-red-500")}>
							{hours.isClosed ? "Closed" : `${hours.open} - ${hours.close}`}
						</span>
					</div>
				))}
			</div>
		</div>

		<div className={`lg:hidden`}>
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger>
						<span className={`px-4`}>Opening Hours </span>
					</AccordionTrigger>
					<AccordionContent>
						<div className="p-4 space-y-2">
							{Object.entries(openingHours).map(([day, hours]) => (
								<div key={day} className="flex justify-between text-sm">
									<span className="capitalize">{day}</span>
									<span className={cn(hours.isClosed && "text-red-500")}>
										{hours.isClosed
											? "Closed"
											: `${hours.open} - ${hours.close}`}
									</span>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	</div>
);

interface RestaurantStatusProps {
	isOpen: boolean;
}

export const RestaurantStatus = ({ isOpen }: RestaurantStatusProps) => (
	<div
		className={cn(
			"border p-1 rounded-full text-xs ",
			isOpen ? "bg-green-50 border-green-200 w-20" : "bg-red-50 border-red-200 w-28",
		)}
	>
		<div
			className={cn(isOpen ? "text-green-700" : "text-red-700")}
		>
			{isOpen ? "Open Now" : "Currently Closed"}
		</div>
	</div>
);
