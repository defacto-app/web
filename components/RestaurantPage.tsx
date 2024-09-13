// components/RestaurantPage.tsx
import React from "react";
import { PhoneIcon, Star } from "lucide-react";
import Image from "next/image";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import RestaurantHeader from "@/components/user/restaurantComponent/RestaurantHeader";
import OperatingHours from "@/components/user/restaurantComponent/OperatingHours";

import { restaurants } from "@/lib/data";
import { MenuTab } from "@/components/user/restaurantComponent/MenuTab";

function Page({ params }: { params: { slug: string } }) {



	return (
		<div className="container mx-auto px-4 py-8">
			<div className="container mx-auto px-4 py-8">
				{JSON.stringify(params)}
			{/*	<RestaurantHeader restaurant={restaurant} />
				<MenuTab restaurant={restaurant} />*/}
			</div>
		</div>
	);
};

export default Page;
