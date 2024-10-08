"use client"
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { HistoryIcon } from "lucide-react";

const pastAddresses = ["No 2 Asaba Street, Lagos", "15 Aba Road, Port Harcourt", "20 Enugu Crescent, Abuja"]; // Array of past addresses

interface Props {
  onSelect: (address: string) => void;
}

export default function PastAddresses({ onSelect }:Props) {
  const [selectedAddress, setSelectedAddress] = React.useState("");

  const handleAddressSelection = (address: string) => {
    setSelectedAddress(address);
    onSelect(address);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="grid place-content-center ">
        <Button > <HistoryIcon className="mr-2"/> Open saved addresses </Button>

        </div>
      </DropdownMenuTrigger>
     <div className="w-[600px] mt-5">
     <DropdownMenuContent className="w-[600px]" >
        <DropdownMenuRadioGroup className="font-semibold text-base" value={selectedAddress} onValueChange={handleAddressSelection}>
          {pastAddresses.map((address) => (
            <DropdownMenuRadioItem key={address} value={address}>
              {address}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
     </div>
    </DropdownMenu>
  );
}
