"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BanknoteIcon, CheckCheckIcon, CheckCircleIcon, CreditCardIcon } from "lucide-react";

export function PaymentModal() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleSelectPaymentMethod = (paymentMethod: any) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const getPaymentMethodName = () => {
    if (selectedPaymentMethod === "cash") {
      return "Pay with Cash";
    } else if (selectedPaymentMethod === "card") {
      return "Pay with Card";
    }
    return "Choose Payment Method";
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button variant="outline">{getPaymentMethodName()}</Button>
        </DialogTrigger>
        <DialogContent className="bg-[#FFFBFB] sm:max-w-[425px] rounded-xl">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div>
            <div
              className={`grid grid-cols-6 bg-white rounded-xl mb-5 mt-2 p-4 ${
                selectedPaymentMethod === "cash" ? "ring ring-primary-600" : ""
              }`}
              onClick={() => handleSelectPaymentMethod("cash")}
            >
              <div className="col-span-1">
                <BanknoteIcon className="text-primary-600" />
              </div>
              <div className="col-span-4">
                <h1>Pay with Cash</h1>
              </div>
              <div className="col-span-1">
                {selectedPaymentMethod === "cash" && <CheckCircleIcon className=" text-primary-600" />}
              </div>
            </div>
            <div
              className={`grid grid-cols-6 bg-white rounded-xl mb-5 mt-2 p-4 ${
                selectedPaymentMethod === "card" ? "ring ring-primary-600" : ""
              }`}
              onClick={() => handleSelectPaymentMethod("card")}
            >
              <div className="col-span-1">
                <CreditCardIcon className="text-primary-600"/>
              </div>
              <div className="col-span-4">
                <h1>Pay with Card</h1>
              </div>
              <div className="col-span-1">
                {selectedPaymentMethod === "card" && <CheckCircleIcon className=" text-primary-600"/>}
              </div>
            </div>
          </div>{" "}

        </DialogContent>
      </Dialog>
    </div>
  );
}
