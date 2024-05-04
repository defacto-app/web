import DeliveryDetails from '@/components/user/DeliveryDetails';
import DeliveryFee from '@/components/user/DeliveryFee';
import ReceiverInfo from '@/components/user/ReceiverInfo';
import SendPackage from '@/components/user/SendPackage';
import WelcomeUser from '@/components/user/WelcomeUser';
import React from 'react';

export default function UserPage() {
  return (
   <div>
    <div className='container mx-auto px-4'>
      <div className='w-full bg-primary-600'>
      <WelcomeUser/>

      </div>

      <h1 className="text-start px-1 py-4 text-primary-600 text-3xl font-bold mt-5">Send Package</h1>
    <div className=" lg:grid lg:grid-cols-12 py-8">
      <div className='col-span-4'>
        <DeliveryDetails />
      </div>
      <div className='col-span-4'>
        <SendPackage/>
      </div>
      <div className='col-span-4'>
        <ReceiverInfo/>
      </div>
      <div>
        <DeliveryFee/>
      </div>
    </div>
    </div>
   </div>
  );
}
