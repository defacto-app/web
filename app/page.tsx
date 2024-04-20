"use client"
import React, { useState } from 'react';

import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoginForm from '@/components/LoginForm'
import ForgotPassword from '@/components/ForgotPassword'
import Welcome from '@/components/Welcome'
import Email from '@/components/Email'
import Password from '@/components/Password'
import SignupForm from '@/components/SignupForm'
import { useRouter } from 'next/router';


export default function HomePage() {
  const [step, setStep] = useState('welcome'); // Initialize with the first step

  const handleStepChange = (nextStep) => {
    setStep(nextStep);
  };

  return (
    <div>
      {step === 'welcome' && (
        <Welcome onNext={() => handleStepChange('email')} />
      )}
      {step === 'email' && (
        <Email onNext={() => handleStepChange('password')} />
      )}
      {step === 'password' && (
        <Password onNext={() => handleStepChange('complete')} />
      )}
      {step === 'complete' && (
        <SignupForm />
      )}
    </div>
  );
}

