import DeliveryDetails from '@/components/user/DeliveryDetails';
import DeliveryFee from '@/components/user/DeliveryFee';
import ReceiverInfo from '@/components/user/ReceiverInfo';
import SendPackage from '@/components/user/SendPackage';
import React from 'react';

export default function UserPage() {
  return (
    <div className="container mx-auto px-4 lg:grid lg:grid-cols-12 py-8">
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
  );
}
