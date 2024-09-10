"use client";
import Link from "next/link"
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
} from "lucide-react"


import {Button} from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import AdminUserAction from "@/app/admin/components/AdminUserAction";
import {UserNav} from "@/app/admin/x/orders/components/user-nav";
import {useEffect} from "react";
import {useAtomAuthContext} from "@/app/store/admin/adminAuthAtom";

const navigation = [
    {
        title: "Dashboard",
        href: "/admin/x/"
    },
    {
        title: "Orders",
        href: "/admin/x/orders"
    },

    {
        title: "Users",
        href: "/admin/x/users"
    },

    {
        title: "Restaurants",
        href: "/admin/x/restaurants"
    },


]

export function AdminHeader() {
    const { getMe } = useAtomAuthContext();

    useEffect(() => {
        getMe();
    }, [getMe]);

    return (
        <div className="flex w-full flex-col bg-white">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav
                    className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Package2 className="h-6 w-6"/>
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    {
                        navigation.map((navItem) => (
                            <Link
                                href={navItem.href}
                                key={navItem.title}
                                className="text-foreground transition-colors hover:text-foreground"
                            >
                                {navItem.title}
                            </Link>
                        ))
                    }

                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6"/>
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            {
                                navigation.map((navItem) => (
                                    <Link
                                        href={navItem.href}
                                        key={navItem.title}
                                        className="text-foreground transition-colors hover:text-foreground"
                                    >
                                        {navItem.title}
                                    </Link>
                                ))
                            }

                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">

                    </form>
                    <UserNav/>

                </div>
            </header>
        </div>
    )
}


export function AdminFooter() {

    return (
        <div className={`border-2 fixed bottom-0 w-full p-2 bg-gray-200`}>
            Admin Footer
        </div>
    )
}