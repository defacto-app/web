"use client";
import React from "react";
import {z} from "zod";
import {useState} from "react";

import Link from "next/link";

import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {json} from "stream/consumers";
import {$adminHttp} from "@/app/config/http";
import env from "@/config/env";
import {InputOTPPattern} from "@/components/ui/InputOTPPattern";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

export default function AdminLogin() {

    const router = useRouter();

    const schema = z.object({
        email: z.string().email({
            message: "Invalid email address eg example@gmail.com",
        }),
        password: z.string().min(5, {
            message: "Password must be at least 5 characters long",
        }),
    });

    const [formData, setFormData] = useState({
        email: "kats.com.ng@gmail.com",
        otp: "457303",
    });
    const [isPending, setIsPending] = useState(false);

    const [userExists, setUserExists] = useState(false);


    function setOtp(otp: string) {
        setFormData({...formData, otp: otp});
    }

    const [errors, setErrors] = useState<{
        [key: string]: string;
    }>({});

    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
        console.log(name, value);
    };


    const handleSubmit = async () => {
        setIsPending(true);
        try {

            const data = await fetch(`/api/auth`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })


            const res = await data.json();



            // save to local storage

            localStorage.setItem("auth-token", res.data.token);

            toast.success("Login successful");

            router.push('/admin/orders');


            setIsPending(false);

        } catch (error: any) {
            console.log(error);
            toast.error("Login credentials are invalid");
            console.log(error);
            setIsPending(false);
        }
    };


    /*    const handleSubmit = async () => {
            try {
                const url = `${env.BASE_URL}/auth/admin-login`;
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                };

                const res = await fetch(url, options);
                const data = await res.json();

                // save the token to local storage

                localStorage.setItem("auth-token", data.token);

                if (data.success){
                    await router.push('/admin/');
                }
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };*/

    async function sendEmailOtp() {
        console.log(JSON.stringify({email: formData.email}), "hows");

        setIsPending(true);


        try {
            const url = `${env.BASE_URL}/auth/email-exists`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({email: formData.email, otp: formData.otp}),

            };


            const res = await $adminHttp(url, options);

            setIsPending(false);
            console.log(res);


        } catch (error) {
            console.log(error);

            setIsPending(false);


        }

    }


    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>


            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        {formData.email}
                        <div className={`flex gap-x-2`}>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <Button onClick={sendEmailOtp} variant={`ghost`} className={`w-20`}>
                                Send OTP
                            </Button>
                        </div>

                        {errors.email && (
                            <p className={`text-red-500 p-4`}>{errors.email}</p>
                        )}
                    </div>
                    <InputOTPPattern setOtp={setOtp} defaultValue={formData.otp}/>
                    {errors.otp && (
                        <p className={`text-red-500 p-4`}>{errors.otp}</p>
                    )}
                    {JSON.stringify(isPending)}
                    <Button loading={isPending} onClick={handleSubmit} type="submit" className="w-full">
                        Login
                    </Button>

                </div>

            </CardContent>
        </Card>
    );
}

function ErrorMsg() {
    return <div>page</div>;
}


export const runtime = 'edge';