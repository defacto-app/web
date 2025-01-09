import type React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { formatPrice } from "@/utils";

interface ItemDetailsProps {
  item: any;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleAddToCart: (item: any, quantity: number) => void;
}

const MenuItemDetails: React.FC<ItemDetailsProps> = ({ item, quantity, setQuantity, handleAddToCart }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Image Section */}
      <div className="relative w-full h-64">
        <Image
          src={item.image}
          alt={item.name}
          className="object-cover"
          fill
          sizes="(max-width: 600px) 100vw, 600px"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 space-y-6">
        {/* Details Section */}
        <div className="rounded-lg p-4">
          <h3 className="text-xl font-semibold">
            {item.name}
          </h3>
          <p className="text-gray-700 mt-2">
            {item.description}
          </p>
          <p className="text-xl font-semibold mt-4">
            {formatPrice(item.price)}
          </p>
        </div>

        {/* Action Section */}
        <div className="flex flex-col gap-4">
          {/* Quantity Selector */}
          <div className="flex justify-center">
            <div className="inline-flex items-center bg-gray-100 rounded-full">
              <button
                type="button"
                className="p-3"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-6 w-6 text-gray-600" />
              </button>
              <span className="w-12 text-center text-xl">
                {quantity}
              </span>
              <button
                type="button"
                className="p-3"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
            onClick={() => handleAddToCart(item, quantity)}
          >
            Add {quantity} for{" "}
            {formatPrice(item.price * quantity)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetails;