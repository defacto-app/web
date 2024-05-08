"use client"
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberValidation = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [valid, setValid] = useState<boolean>(true);

  const handleChange = (value: string) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div>

<PhoneInput
        country={'ng'}
        value={phoneNumber}
        onChange={handleChange}
        inputProps={{
          required: true,
        }}
        inputClass="w-full border-gray-300 rounded-md h-12 px-4 focus:outline-none focus:ring focus:border-blue-500"
        />
      {!valid && (
        <p className='text-red-500 text-sm'>Please enter a valid phone number.</p>
      )}
    </div>
  );
};

export default PhoneNumberValidation;