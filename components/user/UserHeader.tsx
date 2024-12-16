"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import UserPopover from "./UserPopover";
import { useAtomAuthContext } from "@/app/store/authAtom";

export default function UserHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isSticky, setIsSticky] = useState(false);
	const { getMe } = useAtomAuthContext();

	useEffect(() => {
		getMe();
	}, [getMe]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			className={`bg-white ${isSticky ? "fixed top-0 left-0 right-0 z-50" : ""}`}
		>
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
				aria-label="Global"
			>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
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
				</motion.div>

				<div className="flex flex-1 items-center justify-end gap-x-6">
					<UserPopover />

				</div>
			</nav>
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<Link href="/">
							<span className="sr-only">Your Company</span>
							<Image
								className="h-8 w-auto"
								src="/logo.png"
								priority={true}
								alt=""
								width={50}
								height={50}
								style={{
									maxWidth: "100%",
									height: "auto",
								}}
							/>
						</Link>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
}
