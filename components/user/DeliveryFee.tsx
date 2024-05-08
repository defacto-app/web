import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { HourglassIcon } from 'lucide-react';

export default function DeliveryFee() {
  const deliveryCost = 0.00;
  const subtotal = 0.00;
  const total = deliveryCost + subtotal;

  const fromLocation = "City Center";
  const toLocation = "Airport";

  return (
    <div className="bg-primary-600 border text-gray-200 border-primary-200 p-4 rounded-xl shadow-md md:w-auto md:min-w-max">

     <div className='grid grid-cols-7'>
      <div className='col-span-2 grid place-content-center'>
        <HourglassIcon className='text-primary-100 text-2xl'/>
      </div>
      <div className='col-span-5'>
      <div className="mb-4 flex justify-between">
        <div className="text-lg">Delivery Cost:</div>
        <div className="text-lg font-semibold">₦{deliveryCost.toFixed(2)}</div>
      </div>
      <div className="border-t border-primary-100"></div>

      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Total:</div>
        <div className="text-lg font-semibold">₦{total.toFixed(2)}</div>
      </div>
      </div>


     </div>
     <div className="mt-4 grid place-items-center">
        <Button variant="secondary" >Checkout</Button>
      </div>
    </div>
  );
}
