import Image from 'next/image';
import React from 'react';

const WelcomeUser = () => {
  const user = "John";

  return (
    <div className=" text-gray-800 p-6 rounded-md  flex items-center">
       <Image
  className=""
  src="/user/welcome.png"
  alt=""
  width={100}
  height={100}
/>
      <div>
        <h1 className="text-xl font-semibold mb-2">Hello {user}, Please send your package.</h1>
      </div>
    </div>
  );
}

export default WelcomeUser;
