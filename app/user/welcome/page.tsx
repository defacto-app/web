import OrdersHistory from '@/components/user/OrdersHistory';
import WelcomeUser from '@/components/user/WelcomeUser';
import React from 'react';

export default function Welcome() {
  return (
    <div> <div className='container mx-auto px-4'>
    <div className='grid lg:grid-cols-6 gap-4'>
      <div className='lg:col-span-3'>
        <WelcomeUser />
      </div>
      <div className='col-span-1'></div>

      <div className='lg:col-span-2'>
        <OrdersHistory />
      </div>
    </div>
  </div></div>
  )
}
