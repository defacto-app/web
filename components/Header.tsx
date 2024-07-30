"use client"
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { X, Menu, UserRoundCogIcon } from "lucide-react";
import UserAuth from "./UserAuth";
import { UserProvider } from "@/app/provider/auth.context";
import env from "@/config/env";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import PickupModal from "./user/PickupModal";

interface NavigationItem {
  name: string;
  href: string;
}

const navigation = [
  { name: "About", href: "/about" },
  { name: "FAQs", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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
    <header className={`bg-[#FFFBFE] ${isSticky ? "fixed top-0 left-0 right-0 z-50" : ""}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8" aria-label="Global">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Link href="/">
            <span className="sr-only">Your Company</span>
            <Image
              className="h-14 w-auto"
              src="/logo.png"
              priority={true}
              alt=""
              width={100}
              height={100}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </Link>
        </motion.div>
        <div className="hidden lg:flex lg:gap-x-12 bg-gray-50 px-8 py-2 rounded-full">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm leading-6 text-gray-900 font-semibold"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          {env.isDev && (
        <div className={`flex gap-x-2`}>
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
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6 text-primary-600" aria-hidden="true" />
          </button>
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
                  height: "auto"
                }} />
            </Link>

            <motion.button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6 text-primary-600" aria-hidden="true" />
            </motion.button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-10 py-10">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div>
                  <Button variant="primary"> Get Startdded</Button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
