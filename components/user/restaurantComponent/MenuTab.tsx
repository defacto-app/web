
"use client"
import type React from 'react';
import { useState } from 'react';
import type { Restaurant, MenuItem } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs1';
import { Card, CardContent, CardDescription,  CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import RestaurantModal from './RestauarantModal';

interface MenuTabProps {
  restaurant: Restaurant;
}

export const MenuTab: React.FC<MenuTabProps> = ({ restaurant }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCartClick = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Tabs defaultValue="For You" className="m-10 place-items-start grid">
        <TabsList className="flex space-x-4">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="For You">For You</TabsTrigger>
          <TabsTrigger value="Deserts">Deserts</TabsTrigger>
          <TabsTrigger value="Drinks">Drinks</TabsTrigger>
        </TabsList>
        <div className="py-4">
          <Input type="text" placeholder="Search" className="mb-4" />
        </div>
        <TabsContent value="All" className="grid grid-cols-3 gap-4">
          {Object.values(restaurant.categories).flat().map((item:any) => (
            <Card key={item.id} className="relative">
              <Image src={item.imageUrl} alt={item.name} width={300} height={200} className="object-cover" />
              {item.isBestSeller && <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded">Best Seller</span>}
              <CardContent className="p-4">
                <CardTitle>{item.name}</CardTitle>
                <CardDescription className="mb-4">{item.description}</CardDescription>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{item.price}</span>
                  <Button variant="outline" className="ml-2" onClick={() => handleAddToCartClick(item)}>+</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        {Object.entries(restaurant.categories).map(([category, menuItems]) => (
          <TabsContent key={category} value={category} className="grid grid-cols-3 gap-4">
            {(menuItems as MenuItem[]).map((item:any) => (
              <Card key={item.id} className="relative">
                <Image src={item.imageUrl} alt={item.name} width={500} height={500} className="object-cover" />
                {item.isBestSeller && <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded">Best Seller</span>}
                <CardContent className="p-4">
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription className="mb-4">{item.description}</CardDescription>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">{item.price}</span>
                    <Button variant="outline" className="ml-2" onClick={() => handleAddToCartClick(item)}>+</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
      {selectedMenuItem && (
        <RestaurantModal
          menuItem={selectedMenuItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
