import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SvgSpinners90RingWithBg } from "@/components/Spinner";

interface SearchBarProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	isLoading?: boolean; // Add new prop
	onClear?: () => void;
}

export const SearchBar = ({
	value,
	onChange,
	placeholder,
	isLoading,
	onClear,
}: SearchBarProps) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "" && onClear) {
			onClear(); // Trigger the clear callback when input is cleared
		}
		onChange(e); // Forward the event to the parent
	};
	return (
		<div>
			<div className="relative">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
				<Input
					variant="rounded"
					className="pl-10 pr-10"
					placeholder={placeholder}
					value={value}
					onChange={handleInputChange}
					type="search"
				/>
				{isLoading && (
					<div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4">
						<SvgSpinners90RingWithBg />
					</div>
				)}
			</div>
		</div>
	);
};
