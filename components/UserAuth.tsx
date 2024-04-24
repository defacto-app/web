"use client";
import React from "react";
import { User } from "lucide-react";
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
          <User />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {/* <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
            <SigninModal />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
