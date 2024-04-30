import {Inter as FontSans} from "next/font/google";
import {cn} from "@/lib/utils";
import PropTypes from "prop-types";
import env from "@/config/env";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={cn(
                "bg-background font-sans antialiased",
                fontSans.variable,
            )}
        >

            {children}

           
        </div>
    );
}

RootLayout.propType = {
    children: PropTypes.node,
    layout: PropTypes.string,
};


export const runtime = 'edge';


