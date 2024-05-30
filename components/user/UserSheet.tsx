'use client'
import { Button } from "@/components/ui/button"
import React, { ReactNode } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SheetWelcome from "./SheetWelcome"

interface UserSheetProps {
  children: ReactNode;
}

const UserSheet: React.FC<UserSheetProps> = ({ children }) => {
  return (
    <div>
      <Sheet>
      <SheetTrigger asChild>
        <div>{children}</div>
      </SheetTrigger>
      <SheetContent >
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
      <SheetWelcome/>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    </div>
  )
}
export default UserSheet;