import React from 'react';
import { Button } from '../ui/button';

export default function DeliveryFee() {
  const deliveryCost = 0.00;
  const subtotal = 0.00;
  const total = deliveryCost + subtotal;

  const fromLocation = "City Center";
  const toLocation = "Airport";

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md md:w-auto md:min-w-max">
      <div className="sm:text-xl font-semibold text-lg text-primary-600">Delivery Fee</div>
      <div className="mb-4">
        <div className="text-lg">Description:</div>
        <div className="text-gray-700">Pickup from {fromLocation} to {toLocation} in Asaba</div>
      </div>
      <div className="mb-4">
        <div className="text-lg">Subtotal:</div>
        <div className="text-lg font-semibold">₦{subtotal.toFixed(2)}</div>
      </div>
      <div className="mb-4">
        <div className="text-lg">Delivery Cost:</div>
        <div className="text-lg font-semibold">₦{deliveryCost.toFixed(2)}</div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Total:</div>
        <div className="text-lg font-semibold">₦{total.toFixed(2)}</div>
      </div>
      <div className="mt-4">
        <Button variant="primary" className="w-full">Checkout</Button>
      </div>
    </div>
  );
}
