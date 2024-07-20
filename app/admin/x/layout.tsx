"use client";

import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import PropTypes from 'prop-types';
import {AdminFooter, AdminHeader} from "@/app/admin/components/admin.header";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import React from "react";
import 'react-toastify/dist/ReactToastify.css';

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});


export default function AdminRootLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div lang="en">

        <div
            className={cn(
                "bg-background font-sans antialiased",
                fontSans.variable,
            )}
        >

        <AdminHeader/>
        <ToastContainer position="top-center"/>
        {children}

        <div>

            <AdminFooter/>
        </div>
        </div>
        </div>
    );
}


export const runtime = 'edge';