"use client"
import React, {useState} from 'react';

import {Mail} from "lucide-react"
import {Button} from "@/components/ui/button"
import LoginForm from '@/components/LoginForm'
import ForgotPassword from '@/components/ForgotPassword'
import Welcome from '@/components/Welcome'
import Email from '@/components/Email'
import Password from '@/components/Password'
import SignupForm from '@/components/SignupForm'
import {useRouter} from 'next/router';
import {Card, CardHeader, CardTitle} from "@/components/ui/card";


export default function HomePage() {
    const allSteps = ['welcome', 'email', 'password', 'complete'];
    const [step, setStep] = useState(allSteps[0]); // Initialize with the first step

    const handleStepChange = (nextStep: React.SetStateAction<string>) => {
        setStep(nextStep);
    };

    function goBack() {
        setStep(allSteps[allSteps.indexOf(step) - 1])
    }

    return (
        <div className="mx-auto max-w-md rounded-xl">

            <div className='bg-red-500'>
                <div>
                    <Button onClick={
                        goBack
                    }>
                        Back
                    </Button>
                </div>
                <div>
                    {step === 'welcome' && (
                        <Welcome  onNext={() => {
                            setStep('email')
                        }}/>

                    )}
                    {step === 'email' && (
                        <Email
                            onNext={() => {
                                setStep('password')
                            }}

                            />
                    )}

      {/* {step === 'password' && (
        <Password value={step}  onNext={() => handleStepChange('complete')} />
      )} */}
      {/* {step === 'complete' && (
        <SignupForm />
      )} */}
                </div>
            </div>
{step}

        </div>

    );
}

