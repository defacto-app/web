import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// Assuming these are your existing components
const SearchBar = ({ isLoading, value, onChange, placeholder }) => (
  <input
    type="text"
    className="w-full p-3 border rounded-lg"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={isLoading}
  />
);

const RestaurantGrid = ({ searchTerm, data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Your restaurant cards here */}
  </div>
);

const MainLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const inputRef = useRef(null);

  const sortByOptions = [
    { id: "near_me", name: "Near me", isActive: true },
    { id: "ratings", name: "Ratings", isActive: false },
    { id: "delivery_fee", name: "Delivery Fee", isActive: false },
  ];

  const popularFilters = [
    { id: "chicken", name: "Chicken" },
    { id: "traditional", name: "Traditional" },
    { id: "chinese_food", name: "Chinese Food" },
  ];

  const moreFilters = [
    { id: "breakfasts", name: "Breakfasts" },
    { id: "lunch", name: "Lunch" },
    { id: "bakery_pastry", name: "Bakery & Pastry" },
    { id: "alcohol_beer", name: "Alcohol/Beer" },
    { id: "ice_cream", name: "Ice Cream" },
  ];

  const filters = [
    { id: "offers", name: "Offers", icon: "🏷️", isDropdown: false },
    { id: "delivery_fee", name: "Delivery Fee", isDropdown: true, options: ["Free", "$0-$5", "$5-$10", "$10+"] },
    { id: "under_30_min", name: "Under 30 min", isDropdown: false },
    { id: "highest_rated", name: "Highest rated", isDropdown: true, options: ["4.5+", "4.0+", "3.5+"] },
    { id: "rating", name: "Rating", isDropdown: true, options: sortByOptions.map(opt => opt.name) },
    { id: "price", name: "Price", isDropdown: true, options: ["$", "$$", "$$$", "$$$$"] },
    { id: "dietary", name: "Dietary", isDropdown: true, options: ["Vegetarian", "Vegan", "Gluten-free"] },
    { id: "sort", name: "Sort", isDropdown: true, options: [...popularFilters, ...moreFilters].map(f => f.name) },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = (filterId) => {
    if (!filters.find((f) => f.id === filterId)?.isDropdown) {
      setActiveFilter(filterId === activeFilter ? null : filterId);
    }
  };

  const toggleDropdown = (filterId) => {
    setDropdownOpen(dropdownOpen === filterId ? null : filterId);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown-container')) {
      setDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div>
      <div className="">
        <div className="flex px-2">
          <div className="w-full">
            <div className="sticky top-0 z-20 bg-white w-full p-4">
              <div ref={inputRef}>
                <SearchBar
                  isLoading={isLoading}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search Restaurant and eateries in Asaba ..."
                />
              </div>

              {/* Filter Bar */}
              <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                {filters.map((filter) => (
                  <div key={filter.id} className="relative dropdown-container flex-shrink-0">
                    <button
                      onClick={() =>
                        filter.isDropdown ? toggleDropdown(filter.id) : handleFilterClick(filter.id)
                      }
                      className={`flex items-center px-4 py-2 rounded-full border ${
                        activeFilter === filter.id
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-800 border-gray-300"
                      } hover:bg-gray-50 transition-colors duration-200`}
                    >
                      {filter.icon && <span className="mr-2">{filter.icon}</span>}
                      {filter.name}
                      {filter.isDropdown && (
                        <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-200 ${
                          dropdownOpen === filter.id ? 'rotate-180' : ''
                        }`} />
                      )}
                    </button>

                    {filter.isDropdown && dropdownOpen === filter.id && (
                      <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg w-48 z-30">
                        {filter.options.map((option, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              console.log(`${filter.name}: ${option} selected`);
                              setDropdownOpen(null);
                            }}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 pt-4 pb-40">
              {/* Your SideBarRestaurant component would go here */}
              <RestaurantGrid searchTerm={searchTerm} data={[]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;