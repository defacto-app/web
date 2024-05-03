"use client"
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from '../ui/input';
import { CalendarDays } from 'lucide-react';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function DeliveryDetails() {
  const [date, setDate] = React.useState<Date>()
  return (
    <div className="container mx-auto px-4 py-8">
      <div className='py-10 bg-gray-100 p-4 rounded-lg shadow-gray-500  text-start  '><h1 className='sm:text-3xl font-semibold text-xl text-primary-600'>Delivery Details</h1></div>
      <div>
        <RadioGroup className='' defaultValue="default">
          <div className="flex items-center space-x-2 py-4">
            <RadioGroupItem value="pickup" id="r1" />
            <Label htmlFor="r1" className='block text-lg font-semibold'>Pickup</Label>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Input className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600' type="address" placeholder="Pickup Address"/>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <RadioGroupItem value="drop-off" id="r3" />
            <Label htmlFor="r3" className='block text-lg font-semibold'>Drop-Off</Label>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Input className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600' type="address" placeholder="Drop-Off Address"/>
          </div>
        </RadioGroup>
        <div className="mb-4">
          <Label htmlFor="calendar" className="block text-lg font-semibold mb-2">Schedule Delivery</Label>
          <div>
          <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
