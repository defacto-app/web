import React, { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAtomAuthContext } from "@/app/store/authAtom";
import Debug from "./Debug";
import Link from "next/link";

interface AccountUpdateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AccountUpdateModal({ open, onOpenChange }: AccountUpdateModalProps) {
  const [modalOpen, setModalOpen] = useState(open);
  const { authUser } = useAtomAuthContext();

  // Determine what needs to be updated
  const needsName = !authUser.firstName;
  const needsPhoneVerification = !authUser.verificationStatus?.isPhoneVerified;

  const getModalTitle = () => {
    if (needsName && needsPhoneVerification) {
      return "Complete Your Profile";
    }
    if (needsName) {
      return "Add Your Name";
    }
    return "Verify Your Phone Number";
  };

  const getModalDescription = () => {
    if (needsName && needsPhoneVerification) {
      return "To ensure smooth delivery and communication, we need your name and a verified phone number. This helps us provide better service and keep you updated about your orders.";
    }
    if (needsName) {
      return "Please add your name to help us personalize your experience and ensure accurate delivery.";
    }
    return "A verified phone number helps us coordinate deliveries and keep you updated about your orders in real-time.";
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{getModalTitle()}</AlertDialogTitle>
          <AlertDialogDescription>
            {getModalDescription()}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Later</AlertDialogCancel>
          <AlertDialogAction>
          <Link href="/user/account">Update Now</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}


export default AccountUpdateModal;