import Image from 'next/image';
import React from 'react';
import { HiOutlineEmojiHappy } from 'react-icons/hi';

const WelcomeUser = () => {
  const user = "John";

  return (
    <div className="bg-primary-600 text-white p-6 rounded-md shadow-md flex items-center">
       <Image
  className=""
  src="/user/welcome.png"
  alt=""
  width={100}
  height={100}
/>
      <div>
        <h1 className="text-3xl font-semibold mb-2">Welcome, {user}!</h1>
        <p className="text-lg">We're glad to have you with us. Enjoy your experience!</p>
      </div>
    </div>
  );
}

export default WelcomeUser;
