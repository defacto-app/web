import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { TimePicker12Demo } from "@/components/date-time/time-picker-12h-demo";

export default function DateTimePicker({
	selected,
	startMonth,
	endMonth,
	onSelect,
	showTimeSelect,
	...props
}: any) {
	const [internalSelected, setInternalSelected] = useState(
		selected ? new Date(selected) : null,
	);

	const [time, setTime] = useState(new Date());

	useEffect(() => {
		if (selected) {
			const selectedDate = new Date(selected);
			setInternalSelected(selectedDate);

			// Initialize time with the selected date
			setTime(new Date(selectedDate));
		}
	}, [selected]);

	const handleSelect = (date: string | number | Date) => {
		const selectedDate = new Date(date);
		// Combine selected date with current time
		selectedDate.setHours(time.getHours());
		selectedDate.setMinutes(time.getMinutes());

		setInternalSelected(selectedDate);

		if (onSelect) {
			onSelect(selectedDate);
		}
	};

	const handleTimeChange = (newTime:any) => {
		setTime(newTime);

		if (internalSelected) {
			// Combine internal selected date with new time
			const combinedDateTime = new Date(internalSelected);
			combinedDateTime.setHours(newTime.getHours());
			combinedDateTime.setMinutes(newTime.getMinutes());

			setInternalSelected(combinedDateTime);

			if (onSelect) {
				onSelect(combinedDateTime);
			}
		}
	};

	return (
		<div>
			<Popover>
				<PopoverTrigger className={`w-full`}>
					<Input
					readOnly
						value={
							internalSelected instanceof Date
								? `${internalSelected.toDateString()} ${internalSelected.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
								: ""
						}
						placeholder="Select a date and time"
					/>
				</PopoverTrigger>
				<PopoverContent className={`flex justify-center w-[340px]`}>
					<div className="flex flex-col">
						<DayPicker
							mode="single"
							selected={internalSelected}
							onSelect={handleSelect}
							startMonth={startMonth}
							endMonth={endMonth}
							captionLayout="dropdown"
							{...props}
						/>

						{showTimeSelect && (
							<TimePicker12Demo setDate={handleTimeChange} date={time} />
						)}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
