import React from "react";
import { formatPrice } from "@/utils";
import Image from "next/image";
function MenuArea({ data }: any) {
	return (
		<div >
			<div>
				{/* Display restaurant details */}
				{/*{restaurant && <RestaurantPage restaurant={restaurant} />}*/}

				{/* Display the menu items */}
				<div>
					<h2>Menu</h2>
					{data.length > 0 ? (
						<ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
							{data.map((item: any) => (
								<li key={item._id}>
									<div className={`bg-white border  rounded-sm `}>

										<Image
											src={item.image}
											alt={item.name}
											className={`rounded-t-sm h-64 w-full object-cover`}
											width={150}
											height={400}
										/>
										<div className={` p-4`}>
											<h3>{item.name}</h3>
											<p>Price: {formatPrice(item.price)}</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p>No menu items available.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default MenuArea;
