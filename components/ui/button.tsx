import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Your existing button variants
const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				primary:
					"rounded-full bg-primary-600 px-2.5 py-4 text-sm cursor-pointer text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
				default:
					"bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
				destructive:
					"bg-red-500 text-gray-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90",
				outlinePrimary:
					"border border-primary-500 text-primary-500 border-2 rounded-full bg-white shadow-sm hover:bg-primary-500 hover:text-white dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
				outline:
					"border border-primary-500 border-2 rounded-full bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
				secondary:
					"bg-gray-400 text-gray-900 shadow-sm hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
				ghost:
					"text-gray-900 dark:text-gray-50", // Removed hover styles
				link: "text-primary-600 dark:text-gray-50 underline-offset-4 font-bold hover:underline ",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md py-4 px-4",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);


export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = "default",
			children,
			loading = false,
			size,
			asChild = false,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";

		// Conditionally apply the scale effect only for specific variants
		const scaleEffectClasses =
			variant === "primary" || variant === "outlinePrimary" ||  variant === "destructive" // Add scale effect only to specific variants
				? "transition-transform transform hover:scale-105 active:scale-95"
				: "";

		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, className }),
					scaleEffectClasses // Add scale effect conditionally
				)}
				ref={ref}
				disabled={loading}
				{...props}
			>
				{loading ? (
					<div className="px-4">
						<SvgSpinners3DotsScaleMiddle className={"text-3xl"} />
					</div>
				) : (
					children
				)}
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };


function SvgSpinners3DotsScaleMiddle(
	props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<circle cx="4" cy="12" r="1.5" fill="currentColor">
				<animate
					attributeName="r"
					dur="0.75s"
					repeatCount="indefinite"
					values="1.5;3;1.5"
				/>
			</circle>
			<circle cx="12" cy="12" r="3" fill="currentColor">
				<animate
					attributeName="r"
					dur="0.75s"
					repeatCount="indefinite"
					values="3;1.5;3"
				/>
			</circle>
			<circle cx="20" cy="12" r="1.5" fill="currentColor">
				<animate
					attributeName="r"
					dur="0.75s"
					repeatCount="indefinite"
					values="1.5;3;1.5"
				/>
			</circle>
		</svg>
	);
}
