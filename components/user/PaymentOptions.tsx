import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Banknote, CreditCardIcon } from "lucide-react";

export default function PaymentOptions() {
	return (
		<div>
			<div className="">
				<Select>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Payment Method" />
					</SelectTrigger>
					<SelectContent className="max-w-max">
						<SelectGroup className="bg-[#FFFBFB] py-10 max-w-4xl">
							<SelectLabel>Choose one</SelectLabel>
							<SelectItem className=" rounded-xl" value="cash">
								<div className="flex items-center justify-between px-4 py-6 gap-5">
									<div>
										<h1>Pay with cash</h1>
									</div>
									<div>
										<Banknote className="text-primary-600" />
									</div>
								</div>
							</SelectItem>
							<SelectItem className="" value="card">
								<div className="flex px-4 py-6 justify-between gap-5">
									<div>
										<h1>Pay with card</h1>
									</div>
									<div>
										<CreditCardIcon className="text-primary-600" />
									</div>
								</div>
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
