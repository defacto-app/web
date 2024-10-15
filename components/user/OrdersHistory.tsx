import { Dot } from "lucide-react";
import React from "react";

interface Order {
  id: number;
  date: string;
  locationFrom: string;
  locationTo: string;
  total: number;
  status: "Completed" | "Pending" | "Cancelled";
}

const orders: Order[] = [
  {
    id: 1,
    date: "2024-05-15",
    locationFrom: "City Center",
    locationTo: "Airport",
    total: 3000, // Total price in Nigerian Naira
    status: "Completed", // Order status: completed, pending, or cancelled
  },
  {
    id: 2,
    date: "2024-05-10",
    locationFrom: "Okpanam",
    locationTo: "Asaba Stadium",
    total: 5000, // Total price in Nigerian Naira
    status: "Pending", // Order status: completed, pending, or cancelled
  },
  {
    id: 3,
    date: "2024-05-05",
    locationFrom: "Cable Point",
    locationTo: "Government House",
    total: 2000, // Total price in Nigerian Naira
    status: "Cancelled", // Order status: completed, pending, or cancelled
  },
];

const OrdersHistory = () => {
  return (
   <div className="bg-white container px-8 py-4 rounded-md mt-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Deliveries</h2>
      {orders.map((order) => (
        <div key={order.id} className=" bg-gray-50 rounded-md p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-semibold">{order.locationFrom} to {order.locationTo}</h3>
              <p className="text-sm text-gray-600">{order.id} <span>{order.date}</span></p>
              <div className="flex items-center">
                <Dot className={getStatusColor(order.status)} />
                <p className={`font-semibold ml-2 ${getStatusTextColor(order.status)}`}>{order.status}</p>
              </div>
            </div>
            <div className="font-semibold">&#8358;{order.total.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Function to get status color based on order status
const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "Completed":
      return "text-green-500";
    case "Pending":
      return "text-orange-500";
    case "Cancelled":
      return "text-red-500";
    default:
      return "";
  }
};

// Function to get status text color based on order status
const getStatusTextColor = (status: Order["status"]) => {
  switch (status) {
    case "Completed":
      return "text-green-600";
    case "Pending":
      return "text-orange-600";
    case "Cancelled":
      return "text-red-600";
    default:
      return "";
  }
};

export default OrdersHistory;
