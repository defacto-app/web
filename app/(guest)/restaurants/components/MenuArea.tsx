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
						<ul className={`grid grid-cols-3 gap-12`}>
							{data.map((item: any) => (
								<li key={item._id}>
									<div className={`bg-white border  rounded-sm `}>
										<Image
											src={item.image}
											alt={item.name}
											className={`rounded-sm h-64 w-full`}
											width={150}
											height={400}
										/>
										<div className={`h-32`}>
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
