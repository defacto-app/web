// OrderLoading.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function OrderHistoryLoading() {
    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* Header Skeleton */}
            <Skeleton className="h-10 w-32 mb-4" />

            {/* Grid of Order Cards */}
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                {/* Generate 4 skeleton cards */}
                {[...Array(4)].map((_, index) => (
                    <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="flex items-center p-4 bg-white shadow-sm rounded-lg border"
                    >
                        {/* Image skeleton */}
                        <Skeleton className="w-20 h-20 rounded-lg" />

                        {/* Content skeleton */}
                        <div className="ml-4 flex-1">
                            {/* Order ID skeletons */}
                            <div className="space-y-1 mb-2">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-3 w-32" />
                            </div>

                            {/* Title skeleton */}
                            <Skeleton className="h-6 w-40 mb-2" />

                            {/* Description skeleton */}
                            <Skeleton className="h-4 w-3/4 mb-2" />

                            {/* Status skeleton */}
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}