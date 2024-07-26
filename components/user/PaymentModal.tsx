import Image from "next/legacy/image";
import React from "react";

export default function PaymentModal() {
  const accounts = [
    {
      id: "cash",
      name: "Cash Payment",
      description: "Pay on delivery",
      image: "/money.png",
    },
    {
      id: "card",
      name: "Paystack",
      description: "Verve ••••7877",
      image: "/paystack.png",
    },
  ];
  return (
    <div>
      <div>
        <div className="bg-primary-600 p-5 rounded-lg mb-4 mt-4">
          <h1 className=" font-semibold text-xl text-gray-200">
            Choose Payment Method
          </h1>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Choose your desired payment method
        </p>
        <fieldset className="mt-2">
          <legend className="sr-only">Bank account</legend>
          <div className="divide-y divide-gray-200">
            {accounts.map((account, accountIdx) => (
              <div
                key={accountIdx}
                className="relative flex gap-x-2 items-start pb-4 pt-3.5"
              >
                <div>
                  <Image
                   id={`account-${account.id}-image`}
                    className=""
                    src={account.image}
                    alt="team"
                    width={50}
                    height={50}
                  />
                </div>

                <div className="min-w-0 flex-1 text-lg leading-6">
                  <label
                    htmlFor={`account-${account.id}`}
                    className="font-medium text-gray-900"
                  >
                    {account.name}
                  </label>
                  <p
                    id={`account-${account.id}-description`}
                    className="text-gray-500"
                  >
                    {account.description}
                  </p>
                </div>
                <div className="ml-3 flex h-6 items-center">
                  <input
                    id={`account-${account.id}`}
                    aria-describedby={`account-${account.id}-description`}
                    name="account"
                    type="radio"
                    defaultChecked={account.id === "cash"}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
