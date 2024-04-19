import React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/LoginForm";
import ForgotPassword from "@/components/ForgotPassword";

export default function HomePage() {
  return (
    <div>
      <Button variant="destructive">Here</Button>
      <Button>
        <Mail className="mr-2 h-4 w-4" />
        Here
      </Button>
      <LoginForm />
      <ForgotPassword />
    </div>
  );
}
