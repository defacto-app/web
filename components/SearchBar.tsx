import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SvgSpinners90RingWithBg } from "@/components/Spinner";

interface SearchBarProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	isLoading?: boolean;
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
			onClear();
		}
		onChange(e);
	};

	return (
		<div className="w-full max-w-lg">
			<div className="relative flex items-center">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				<Input
					variant="rounded"
					className="pl-10 pr-10 w-full"
					placeholder={placeholder}
					value={value}
					onChange={handleInputChange}
					type="search"
				/>
				{isLoading && (
					<div className="absolute right-3 top-1/2 -translate-y-1/2">
						<SvgSpinners90RingWithBg className="h-4 w-4 text-muted-foreground animate-spin" />
					</div>
				)}
			</div>
		</div>
	);
}

export default SearchBar;