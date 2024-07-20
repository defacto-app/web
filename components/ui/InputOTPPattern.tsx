import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {useEffect, useState} from "react";


interface InputOTPPatternProps {
    setOtp: (otp: string) => void;
    defaultValue: string;
}

export function InputOTPPattern({setOtp, defaultValue}: InputOTPPatternProps) {
    // Use the defaultValue prop to set the initial state
    const [localOtp, setLocalOtp] = useState(defaultValue);
    console.log(defaultValue);
    useEffect(() => {
        // This will set the local state to the defaultValue when the component mounts
        // or when defaultValue changes.
        setLocalOtp(defaultValue);
    }, [defaultValue]);

    const handleChange = (newOtp: string) => {
        setLocalOtp(newOtp); // Update local state
        setOtp(newOtp); // Update parent state
    };


    return (
        <InputOTP
            value={localOtp}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            onChange={handleChange}
        >
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>
    )
}