import React from 'react';

export const AllRestaurantLoading = () => {
    return (
        <div className="pt-4 pb-20">
            <div className="flex px-2">
                {/* Sidebar Skeleton */}
                <div className="hidden md:block sticky top-0 h-screen w-[400px] border-r pr-6">
                    <div className="space-y-8 animate-pulse">
                        {/* Sidebar Header */}
                        <div className="h-8 w-48 bg-gray-200 rounded"/>

                        {/* Filter Groups */}
                        <div className="space-y-6">
                            {/* Filter Group 1 */}
                            <div className="space-y-4">
                                <div className="h-6 w-32 bg-gray-200 rounded"/>
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="h-4 w-4 bg-gray-200 rounded"/>
                                            <div className="h-4 w-24 bg-gray-200 rounded"/>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Filter Group 2 */}
                            <div className="space-y-4">
                                <div className="h-6 w-40 bg-gray-200 rounded"/>
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="h-4 w-4 bg-gray-200 rounded"/>
                                            <div className="h-4 w-32 bg-gray-200 rounded"/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="w-full">
                    {/* Search Header */}
                    <div className="sticky top-0 z-10 bg-white w-full p-4 space-y-4">
                        <div className="animate-pulse">
                            <div className="h-10 sm:w-[300px] md:w-[600px] bg-gray-200 rounded"/>
                            <div className="h-6 w-64 bg-gray-200 rounded mt-4"/>
                        </div>
                    </div>

                    {/* Restaurant Grid */}
                    <div className="px-6 pb-40">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 9 }).map((_, index) => (
                                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div key={index} className="animate-pulse space-y-4">
                                    {/* Restaurant Card */}
                                    <div className="rounded-lg overflow-hidden">
                                        <div className="h-48 bg-gray-200 w-full"/>
                                        <div className="p-4 space-y-4">
                                            <div className="h-5 bg-gray-200 rounded w-3/4"/>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <div className="h-4 w-4 bg-gray-200 rounded-full"/>
                                                    <div className="h-4 bg-gray-200 rounded w-1/2"/>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="h-4 w-4 bg-gray-200 rounded-full"/>
                                                    <div className="h-4 bg-gray-200 rounded w-1/3"/>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="h-4 bg-gray-200 rounded w-24"/>
                                                <div className="h-8 w-8 bg-gray-200 rounded-full"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



import { SearchX } from "lucide-react";

export const NoResultsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <SearchX size={64} className="text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
      <p className="text-gray-600 max-w-md">
        We couldn't find any restaurants matching your search. Try adjusting your search terms or browse our available restaurants.
      </p>
    </div>
  );
};
