import React from 'react';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '../ui/label';

export default function ReceiverInfo() {
  const tabItems = [
    { value: 'car', label: 'Car', description: 'Convenient delivery option for larger packages and bulkier items, ensuring safe and efficient transportation by road.' },
    { value: 'bike', label: 'Bike', description: 'Swift and eco-friendly delivery solution ideal for smaller parcels and urban areas, offering quick navigation through traffic and narrow streets.' },
    { value: 'boat', label: 'Boat', description: 'Specialized delivery service for coastal and water-accessible locations.' },
    { value: 'plane', label: 'Plane', description: 'Expedited delivery method for long-distance and remote areas, ensuring timely deliveries across regions.' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
            <div className='py-10 bg-gray-100 p-4 rounded-lg shadow-gray-500  text-start  '><h1 className='sm:text-xl font-semibold text-lg text-primary-600'>Receiver Information</h1></div>

      <div className="mb-6">
      <div className="mb-4 mt-4">
          <Label htmlFor="name" className="block text-lg font-semibold mb-2">Full Name</Label>
          <Input
            id="name"
            name="full-name"
            type="name"
            placeholder="e.g Olusegun Obasanjo"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="number" className="block text-lg font-semibold mb-2">Phone Number</Label>
          <Input
            id="number"
            name="number"
            type="number"
            placeholder="090*******"
            required
          />
        </div>
      </div>
      <div>
        <h1 className="text-lg font-semibold mb-2">Choose mode of Delivery</h1>
        <Tabs defaultValue="account" className="">
          <TabsList >
            {tabItems.map(item => (
              <TabsTrigger key={item.value} value={item.value}>{item.label}</TabsTrigger>
            ))}
          </TabsList>
          {tabItems.map(item => (
            <TabsContent key={item.value} value={item.value}>{item.description}</TabsContent>
          ))}
        </Tabs>

      </div>
    </div>
  );
}
