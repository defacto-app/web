"use client"
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { $admin_api } from "@/http/admin-endpoint";
import { Card } from "@/components/ui/card";
import {
  Users,
  Store,
  ShoppingBag,
  Menu,
  ArrowUp,
  ArrowDown,
  Clock
} from "lucide-react";

export default function AdminIndex() {
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await $admin_api.dashboard();
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-bold">Loading Dashboard...</h1>
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <h2 className="text-2xl font-bold">{data.users.total}</h2>
              <div className="flex items-center mt-2 text-sm">
                <p>Verified: {data.users.verified}</p>
                <span className="mx-2">•</span>
                <p>Unverified: {data.users.unverified}</p>
              </div>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Restaurants</p>
              <h2 className="text-2xl font-bold">{data.restaurants.total}</h2>
              <p className="text-sm mt-2">Popular: {data.restaurants.popularCategory}</p>
            </div>
            <Store className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Orders</p>
              <h2 className="text-2xl font-bold">{data.orders.total}</h2>
              <p className="text-sm mt-2">Avg Value: ₦{Math.round(data.orders.avgValue)}</p>
            </div>
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Menu Items</p>
              <h2 className="text-2xl font-bold">{data.menu.total}</h2>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUp className="h-4 w-4" /> {data.menu.available}
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-500 flex items-center">
                  <ArrowDown className="h-4 w-4" /> {data.menu.unavailable}
                </span>
              </div>
            </div>
            <Menu className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Order Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Instant Orders</span>
              <span>{data.orders.instantOrders}</span>
            </div>
            <div className="flex justify-between">
              <span>Pending  48hrs</span>
              <span>{data.orders.pendingOlderThan48Hours}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Order Value</span>
              <span>₦{Math.round(data.orders.avgValue)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">User Distribution</h3>
          <div className="space-y-4">
            {data.users.roles.map((role: any) => (
              <div key={role._id} className="flex justify-between">
                <span className="capitalize">{role._id}s</span>
                <span>{role.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground text-right">
        <Clock className="h-4 w-4 inline mr-2" />
        Last updated: {data.timestamp}
      </div>
    </div>
  );
}

export const runtime = "edge";