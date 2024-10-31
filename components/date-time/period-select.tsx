"use client";

import * as React from "react";

import { display12HourValue, setDateByType } from "./time-picker-utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";


interface TimePeriodSelectProps {
	period: string;
	setPeriod: (value: string) => void;
	date: Date | undefined;
	setDate: (date: Date) => void;
	onLeftFocus?: () => void;
	onRightFocus?: () => void;
}

export const TimePeriodSelect = React.forwardRef<HTMLButtonElement, TimePeriodSelectProps>(
	({ period, setPeriod, date, setDate, onLeftFocus, onRightFocus }, ref) => {
		const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
			if (e.key === "ArrowRight") onRightFocus?.();
			if (e.key === "ArrowLeft") onLeftFocus?.();
		};

		const handleValueChange = (value: string) => {
			setPeriod(value);

			if (date) {
				const tempDate = new Date(date);
				const hours = display12HourValue(date.getHours());
				setDate(
					setDateByType(
						tempDate,
						hours.toString(),
						"12hours",
						period === "AM" ? "PM" : "AM",
					),
				);
			}
		};

		return (
			<div className="flex h-10 items-center">
				<Select
					defaultValue={period}
					onValueChange={(value) => handleValueChange(value)}
				>
					<SelectTrigger
						ref={ref}
						className="w-20 focus:bg-accent focus:text-accent-foreground"
						onKeyDown={handleKeyDown}
					>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="AM">AM</SelectItem>
						<SelectItem value="PM">PM</SelectItem>
					</SelectContent>
				</Select>
			</div>
		);
	},
);

TimePeriodSelect.displayName = "TimePeriodSelect";

