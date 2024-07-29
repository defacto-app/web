"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { StarsIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

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
  onAddToCart: (item: MenuItem, selectedOptions: Record<string, string[]>) => void;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ menuItem, isOpen, onClose, onAddToCart }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

  if (!menuItem) {
    return null;
  }

  const handleOptionChange = (optionName: string, choiceId: string, checked: boolean) => {
    setSelectedOptions(prev => {
      const currentChoices = prev[optionName] || [];
      if (checked) {
        return { ...prev, [optionName]: [...currentChoices, choiceId] };
      } else {
        return { ...prev, [optionName]: currentChoices.filter(id => id !== choiceId) };
      }
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, optionName: string, choiceId: string) => {
    handleOptionChange(optionName, choiceId, e.target.checked);
  };

  const handleAddToCart = () => {
    onAddToCart(menuItem, selectedOptions);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl mx-auto p-6 rounded-lg overflow-y-auto max-h-screen">
        <DialogHeader className="relative">
          <Image
            src={menuItem.imageUrl || '/placeholder.png'}
            alt={menuItem.name}
            width={600}
            height={400}
            className="object-cover w-full h-64 rounded-t-lg"
          />
          {menuItem.isBestSeller && (
            <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">Best Seller</span>
          )}
          <div className="mt-4">
            <DialogTitle className="text-2xl font-semibold">{menuItem.name}</DialogTitle>
            <DialogDescription className="mt-2 text-sm text-gray-600">{menuItem.description}</DialogDescription>
            <div className="flex items-center mt-2">
              {[...Array(menuItem.stars)].map((_, index) => (
                <StarsIcon key={index} className="h-5 w-5 text-yellow-500" />
              ))}
              <span className="ml-2 text-sm text-gray-500">({menuItem.rating} reviews)</span>
            </div>
            <span className="mt-4 text-xl font-bold text-green-600">{menuItem.price}</span>
          </div>
        </DialogHeader>
        <div className="mt-4">
          {menuItem.options?.map(option => (
            <div key={option.name} className="my-4">
              <h4 className="font-bold text-lg">{option.name} {option.required && <span className="text-red-500">*</span>}</h4>
              <div className="space-y-2 mt-2">
                {option.choices.map(choice => (
                  <div key={choice.id} className="flex items-center justify-between">
                    <span className="flex-1">{choice.name}</span>
                    <span className="flex-1 text-gray-600 text-right mr-2">{choice.price}</span>
                    <Checkbox
                      className="ml-4"
                      id={`${option.name}-${choice.id}`}
                      name={option.name}
                      value={choice.id}
                      onChange={(e) => handleCheckboxChange(e, option.name, choice.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button className="w-full bg-blue-500 text-white mt-4 py-2 rounded" onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantModal;
