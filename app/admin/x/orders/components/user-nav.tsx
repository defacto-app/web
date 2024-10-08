"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAtomAuthContext } from "@/app/store/admin/adminAuthAtom";
import { UserCog } from "lucide-react";

export function UserNav() {
	const { getMe, authUser } = useAtomAuthContext();

	const router = useRouter();

	async function handleLogout() {
		try {
			// Call the API to clear cookies on the server
			await fetch(`/api/auth/logout`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			// Clear local storage on the client-side
			localStorage.removeItem("auth-token");

			// Redirect to the login page
			router.push("/admin/login");
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-9 w-9">
						<AvatarImage  alt="avatar" />
						<AvatarFallback>
							{" "}
							<UserCog />{" "}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						{/*<p className="text-sm font-medium leading-none">shadcn</p>*/}
						<p className="text-sm font-medium  leading-none text-muted-foreground">
							{authUser.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>New Team</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
