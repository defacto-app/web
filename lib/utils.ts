import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

import { differenceInSeconds, format } from "date-fns";
import type {  OpeningHours } from "./types";

export function formatDateFromNow(date: Date | string | number): string {
	// Convert date to a Date object
	const targetDate = new Date(date);

	// Check if targetDate is a valid date
	if (Number.isNaN(targetDate.getTime())) {
		console.error("Invalid date:", date);
		return "Invalid date";
	}

	const now = new Date();
	const diffInSeconds = differenceInSeconds(now, targetDate);

	// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
	let formattedDate;

	if (diffInSeconds < 86400) {
		// Less than 24 hours
		if (diffInSeconds < 10) {
			formattedDate = "now";
		} else if (diffInSeconds < 60) {
			formattedDate = `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
		} else if (diffInSeconds < 3600) {
			const diffInMinutes = Math.floor(diffInSeconds / 60);
			formattedDate = `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
		} else {
			const diffInHours = Math.floor(diffInSeconds / 3600);
			formattedDate = `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
		}
	} else {
		formattedDate = format(targetDate, "dd/MM/yyyy");
	}

	return formattedDate;
}





export const cleanOpeningHours = (openingHours: OpeningHours): OpeningHours => {
  const defaultHours = {
    open: "10:00",
    close: "19:00",
    isClosed: false
  };

  return {
    monday: openingHours.monday || defaultHours,
    tuesday: openingHours.tuesday || defaultHours,
    wednesday: openingHours.wednesday || defaultHours,
    thursday: openingHours.thursday || defaultHours,
    friday: openingHours.friday || defaultHours,
    saturday: openingHours.saturday || defaultHours,
    sunday: openingHours.sunday || defaultHours
  };
};