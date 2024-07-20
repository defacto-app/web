import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { JSX } from "react/jsx-runtime";
import {cn} from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
    {
        variants: {
            variant: {
                default:
                    "bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
                primary:
                    "bg-green-500 text-gray-50 hover:bg-green-500/90 dark:bg-green-900 dark:text-gray-50 dark:hover:bg-green-900/90",
                destructive:
                    "bg-red-500 text-gray-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90",
                outline:
                    "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
                secondary:
                    "bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
                ghost:
                    "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
                link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
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
            variant,
            size,
            asChild = false,
            loading = false,
            children,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
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

export function SvgSpinners3DotsScaleMiddle(
    props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
    return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
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
                {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                <animate
                    attributeName="r"
                    dur="0.75s"
                    repeatCount="indefinite"
                    values="3;1.5;3"
                ></animate>
            </circle>
            <circle cx="20" cy="12" r="1.5" fill="currentColor">
                {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                <animate
                    attributeName="r"
                    dur="0.75s"
                    repeatCount="indefinite"
                    values="1.5;3;1.5"
                ></animate>
            </circle>
        </svg>
    );
}
