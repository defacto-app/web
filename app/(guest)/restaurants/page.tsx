"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import RestaurantGrid from "@/components/restaurant/RestaurantGrid";
import { $api } from "@/http/endpoints";
import SideBarRestaurant from "@/components/restaurant/RestaurantFilterComponent";
import { useQuery } from "react-query";
import { useDebounce } from "react-haiku";
import { AllRestaurantLoading } from "./components/AllRestaurantLoading";
import SearchBar from "@/components/SearchBar";
import { RestaurantQueryParams } from "@/lib/types";

interface FilterOptions {
  category: string;
  menuCategory: string;
  dietary: string[];
  priceRange: string;
  quickFilter: string;
  sort: string;
}

const fetchRestaurants = async (
  page: number,
  perPage: number,
  searchTerm: string,
  filters: FilterOptions
): Promise<any> => {
  const params: RestaurantQueryParams = {
    page,
    perPage,
    ...(searchTerm && { search: searchTerm }),
    ...(filters.category && { category: filters.category }),
    ...(filters.dietary.length > 0 && { dietary: filters.dietary.join(",") }),
    ...(filters.quickFilter && { quickFilter: filters.quickFilter }),
    ...(filters.sort && filters.sort !== "recommended" && { sort: filters.sort }),
    ...(filters.priceRange && { priceRange: filters.priceRange })
  };

  return $api.guest.restaurant.all(params);
};

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [filters, setFilters] = useState<FilterOptions>({
    category: "",
    menuCategory: "",
    dietary: [],
    priceRange: "",
    quickFilter: "",
    sort: "recommended"
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedFilters = useDebounce(filters, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, error, isLoading, refetch } = useQuery(
    ["restaurant", page, perPage, debouncedSearchTerm, debouncedFilters],
    () => fetchRestaurants(page, perPage, debouncedSearchTerm, debouncedFilters)
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset page when search changes
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1); // Reset page when filters change
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    refetch();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [debouncedSearchTerm, debouncedFilters, refetch]);

  if (isLoading) {
    return <AllRestaurantLoading />;
  }

  if (error) return <div>Error loading data...</div>;

  return (
    <div>
      <div className="">
        <div className="flex px-2">
          <div className="w-full container mx-auto">
            <div className="sticky top-0 z-10 bg-white w-full p-4">
              <div ref={inputRef}>
                <SearchBar
                  isLoading={isLoading}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search Restaurant and eateries in Asaba ..."
                />
              </div>
            </div>
            <div className="px-6 pt-4 pb-40">
              <SideBarRestaurant
                selectedFilters={filters}
                onFilterChange={handleFilterChange}
              />


              <RestaurantGrid searchTerm={searchTerm} data={data?.data?.data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}