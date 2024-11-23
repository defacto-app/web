import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {SvgSpinners90RingWithBg} from "@/components/Spinner";

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    isLoading?: boolean; // Add new prop
}

export const SearchBar = ({
                              value,
                              onChange,
                              placeholder,
                              isLoading,
                          }: SearchBarProps) => (
    <div className="sticky top-0 bg-gray-50 z-10 py-4">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
                variant="rounded"
                className="pl-10 pr-10"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4">
                    <SvgSpinners90RingWithBg />
                </div>
            )}
        </div>
    </div>
);