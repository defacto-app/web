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
import { Button } from "./ui/button";

export default function UserAuth() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          {/* <User className="text-primary-500"/> */}
          <div className="rounded-full bg-primary-500 px-2.5 py-1.5 text-sm cursor-pointer  text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Get Started</div>
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
