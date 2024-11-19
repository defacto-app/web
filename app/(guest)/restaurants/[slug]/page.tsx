"use client";

import { useEffect, useState } from "react";
import { $api } from "@/http/endpoints";
import Image from "next/image";
import { MapPin, Clock1, Search, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import MenuArea from "@/app/(guest)/restaurants/components/MenuArea";
import OrderCart from "@/app/user/checkout/OrderCart";
import Link from "next/link";

function RestaurantPage({ params }: { params: { slug: string } }) {
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menu, setMenu] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await $api.guest.restaurant.one(params.slug);
        setRestaurant(res.data.restaurant);
        setMenu(res.data.menu);
      } catch (e) {
        setError("Failed to load restaurant data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.slug]);

  const sections = ["All", ...Array.from(new Set(menu.map(item => item.menuType)))];

  const filteredMenu = menu.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return activeSection === "All" ? matchesSearch : matchesSearch && item.menuType === activeSection;
  });

  if (loading || !restaurant) return null;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="px-4 py-2 bg-white border-b">
        <div className="max-w-7xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-gray-500">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/restaurants" className="text-gray-500">Restaurants</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">{restaurant.name}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[280px] bg-gray-900">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex items-center px-4">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 bg-white rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
                <div className="flex gap-6 items-center">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4 text-green-400" />
                    <span>95%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock1 className="w-4 h-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto pl-2  pr-10 py-6">
        <div className="flex gap-6">
          {/* Sections */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 border sticky top-4">
              <h2 className="font-semibold mb-4">Sections</h2>
              <div className="space-y-2">
                {sections.map(section => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      activeSection === section ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Content */}
          <div className="flex-1">
            {/* Sticky Search */}
            <div className="sticky top-0 bg-gray-50 z-10 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder={`Search in ${restaurant.name}`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <MenuArea data={filteredMenu} />
          </div>

          {/* Cart */}
          <div className="w-80">
            <div className="sticky top-4  -mr-4">
              <OrderCart restaurant_name={restaurant.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantPage;