"use client";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [previousPath, setPreviousPath] = useState<string>("");

  useEffect(() => {
    // Store the current path when component mounts or path changes
    if (pathname !== previousPath) {
      setPreviousPath(pathname);
    }
  }, [pathname,previousPath]);

  const handleBack = () => {
    if (previousPath.includes('/auth/login')) {
      router.push('/');
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
    >
      <ArrowLeft size={30} />
    </Button>
  );
};

export default BackButton;