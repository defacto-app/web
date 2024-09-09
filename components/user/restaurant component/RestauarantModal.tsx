import type React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  rating: number;
  stars: number;
  isBestSeller: boolean;
  options?: Array<{
    name: string;
    required: boolean;
    choices: Array<{
      id: string;
      name: string;
      price: string;
    }>
  }>;
}

interface RestaurantModalProps {
  menuItem: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ menuItem, isOpen, onClose }) => {
  if (!menuItem) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <Image src={menuItem.imageUrl || '/placeholder.png'} alt={menuItem.name} width={300} height={200} className="object-cover rounded-t-lg" />
          <div className="p-4">
            <DialogTitle>{menuItem.name}</DialogTitle>
            <DialogDescription>
              {menuItem.description}
            </DialogDescription>
            <span className="text-lg font-bold text-green-600">{menuItem.price}</span>
          </div>
        </DialogHeader>
        <DialogContent>
          {menuItem.options?.map(option => (
            <div key={option.name} className="my-4">
              <h4 className="font-bold">{option.name} {option.required && <span className="text-red-500">Required</span>}</h4>
              {option.choices.map(choice => (
                <div key={choice.id} className="flex items-center justify-between py-2">
                  <span>{choice.name}</span>
                  <span>{choice.price}</span>
                  <Input type="radio" name={option.name} value={choice.name} />
                </div>
              ))}
            </div>
          ))}
          <Button className="w-full bg-blue-500 text-white mt-4">Add to Cart</Button>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantModal;
