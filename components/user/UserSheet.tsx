"use client";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/sheet";
import SheetWelcome from "./SheetWelcome";
import SendReceive from "../SendReceive";
import ReceiveSend from "../ReceiveSend";
import Image from "next/image";


interface UserSheetProps {
  children: ReactNode;
}



const UserSheet: React.FC<UserSheetProps> = ({ children }) => {



  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <div>{children}</div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-10">
            <SheetTitle>
              <div>
              <Image
              className="h-10 w-auto"
              src="/logo.png"
              alt=""
              width={70}
              height={70}
            />
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-14 mb-10">
            <h1 className="text-lg font-semibold text-gray-800">
              Easy package delivery with Defacto
            </h1>
            <p className="text-base text-gray-600">
              Send and receive packages from friends, vendors, or loved ones.
            </p>
          </div>
          {/* <SheetWelcome/> */}
          <SendReceive />
          <ReceiveSend />
          <SheetFooter>
            {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default UserSheet;
