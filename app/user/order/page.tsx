import React from 'react'
import HeroImage from '@/components/user/HeroImage';
import OrdersSection from '@/components/user/OrdersSection';
import WelcomeUser from '@/components/user/WelcomeUser';


export default function OrderSection() {
  return (
   <div>


<div className='container mx-auto px-4 bg-[#FFFBFE]'>
  <div className='grid lg:grid-cols-6 gap-4'>
    <div className='lg:col-span-3'>
      <WelcomeUser />
      <HeroImage />
    </div>
    <div className='col-span-1'></div>

    <div className='lg:col-span-2'>
      <OrdersSection />
    </div>
  </div>
</div>
   </div>
  )
}
