import Questions from '@/components/Questions'
import React from 'react'

export default function faqpage() {
  return (
    <div className='p-20 grid justify-items-center'>
       <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
          Have a different question and can’t find the answer you’re looking for? Reach out to our support team by{' '}
          <a href="#" className="font-semibold text-primary-600 hover:text-primary-500">
            sending us an email
          </a>{' '}
          and we’ll get back to you as soon as we can.
        </p>
<Questions/>
    </div>
  )
}
