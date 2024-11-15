import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {}

const inputVariants = cva(
	"flex h-10 w-full px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none dark:placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"rounded-md border border-slate-300 bg-white ring-offset-white dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950",
				line:
					"border-0 border-b border-slate-300 bg-transparent focus-visible:border-b-primary-600 focus-visible:ring-0 dark:border-slate-800 dark:focus-visible:border-b-slate-300",
				rounded:
					"rounded-full border border-slate-300 bg-white ring-offset-white dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, ...props }, ref) => {
		return (
			<input
				className={cn(inputVariants({ variant }), className)}
				ref={ref}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";

export { Input, inputVariants };
