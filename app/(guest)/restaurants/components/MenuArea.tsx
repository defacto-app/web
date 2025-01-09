import React from "react";
import { formatPrice } from "@/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import { addItemAtom } from "@/app/store/cart/cartAtom";
import { Plus } from "lucide-react";

interface MenuAreaProps {
  data: any[];
  categories: any[];
}

function MenuArea({ data, categories }: MenuAreaProps) {
  const addItem = useSetAtom(addItemAtom);

  const handleAddToCart = (item: any) => {
    const cartItem = {
      publicId: item.publicId,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    } as any;
    addItem(cartItem);
  };

  const groupedItems = data.reduce((acc: any, item: any) => {
    const categoryId = item.category._id;
    const categoryName = item.category.name;

    if (!acc[categoryId]) {
      acc[categoryId] = {
        name: categoryName,
        items: [],
      };
    }

    acc[categoryId].items.push(item);
    return acc;
  }, {});

  if (data.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No menu items found.</p>
      </div>
    );
  }

  return (
    <div>
      {Object.entries(groupedItems).map(([categoryId, group]: [string, any]) =>
        group.items.length > 0 && (
          <div
            key={categoryId}
            id={`category-${categoryId}`}
            className="mb-8 scroll-mt-20"
          >
            <h2 className="text-lg font-semibold mb-4">{group.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map((item: any) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-4 flex items-start gap-4"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="rounded-lg object-cover"
                      fill
                      sizes="(max-width: 96px) 100vw, 96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                            {item.description}
                          </p>
                          {item.available ? (
                            <div className="text-md text-gray-900 mt-2">
                              {formatPrice(item.price)}
                            </div>
                          ) : (
                            <div className="text-red-400 text-sm mt-2">Unavailable</div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-gray-100 hover:bg-gray-200 h-12 w-12 flex-shrink-0"
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.available}
                          title={!item.available ? "Item unavailable" : "Add to cart"}
                        >
                          <Plus className="h-6 w-6 text-blue-500 stroke-[3]" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default MenuArea;