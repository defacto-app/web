import React from 'react';
import { Button } from '../ui/button';
import Image from "next/image";
import { HourglassIcon } from 'lucide-react';

export default function DeliveryFee() {
  const deliveryCost = 0.00;
  const subtotal = 0.00;
  const total = deliveryCost + subtotal;

  const fromLocation = "City Center";
  const toLocation = "Airport";

  return (
    <div className="bg-secondary-500 mt-4 text-gray-200 border border-primary-600 py-2  md:w-auto md:min-w-max">

     <div className='grid grid-cols-7'>
      <div className='col-span-2 text-start grid place-content-center'>
        Delivery Fee
      </div>
      <div className='col-span-3'></div>
      <div className='col-span-2'>
      <div>
        <div className="text-lg text-end px-2 font-semibold">₦{deliveryCost.toFixed(2)}</div>
      </div>

      {/* <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Total:</div>
        <div className="text-lg font-semibold">₦{total.toFixed(2)}</div>
      </div> */}
      </div>


     </div>

    </div>
  );
}
