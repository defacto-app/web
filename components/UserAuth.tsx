"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SigninModal from "./auth/SigninModal";

export default function UserAuth() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          {/* <User className="text-primary-600"/> */}
          <div className="rounded-full py-3 bg-primary-600 px-2.5 text-sm cursor-pointer  text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Get Started</div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>

            <SigninModal />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
