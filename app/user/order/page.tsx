import React from 'react'
import HeroImage from '@/components/user/HeroImage';
import OrdersSection from '@/components/user/OrdersSection';
import WelcomeUser from '@/components/user/WelcomeUser';
import FoodHeroImage from '@/components/user/FoodHeroImage';


export default function OrderSection() {
  return (
   <div>


<div className='container mx-auto px-4 bg-[#FFFBFE]'>
<WelcomeUser />

  <div className='grid lg:grid-cols-8 gap-4'>
    <div className='lg:col-span-4'>
      <HeroImage />
    </div>

    <div className='lg:col-span-4'>
    <FoodHeroImage/>

    </div>
  </div>
</div>
<OrdersSection />

   </div>
  )
}
