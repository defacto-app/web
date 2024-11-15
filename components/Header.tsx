"use client";
import { useState, useEffect } from "react";
import {  UserRoundCogIcon } from "lucide-react";
import UserAuth from "./UserAuth";
import { UserProvider } from "@/app/provider/auth.context";
import envData from "@/config/envData";
import Link from "next/link";
import Image from "next/image";
import { useAtomAuthContext } from "@/app/store/authAtom";
import UserCart from "@/components/user/UserCart";

export default function Header() {
	const [isSticky, setIsSticky] = useState(false);
	const { getMe } = useAtomAuthContext();

	useEffect(() => {
		getMe();
	}, [getMe]);

	return (
		<header
			className={`bg-white ${isSticky ? "fixed top-0 left-0 right-0 z-50" : ""}`}
		>
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
				aria-label="Global"
			>
				<Link href="/">
					<span className="sr-only">Your Company</span>
					<Image
						className="h-14 w-auto"
						src="/logo.png"
						priority={true}
						alt=""
						width={100}
						height={100}
					/>
				</Link>

				<div className="flex flex-1 items-center justify-end gap-x-6">
					{envData.isDev && (
						<div className={`flex gap-x-2`}>
							<UserCart />
							<Link href="/admin">
								<UserRoundCogIcon className="text-red-500" size={20} />
							</Link>
							<Link href="/user">
								<UserRoundCogIcon className="text-green-500" size={20} />
							</Link>
						</div>
					)}
					<UserProvider>
						<UserAuth />
					</UserProvider>
				</div>
			</nav>
		</header>
	);
}
