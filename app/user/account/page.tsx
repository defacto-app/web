"use client";
import React from "react";
import { useAtomAuthContext } from "@/app/store/authAtom";
import EditUserModal from "@/components/user/EditUserModal";
import EditUserNumberModal from "@/components/user/EditUserNumberModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone } from "lucide-react";

function AccountPage() {
  const { authUser } = useAtomAuthContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Personal Information */}
            <div className="space-y-6">
              {/* Name Section */}
              <div className="flex items-center justify-between group">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <User className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="mt-1 text-base font-medium">
                      {authUser.firstName || "Not set"}
                    </p>
                  </div>
                </div>
                <EditUserModal />
              </div>

              {/* Email Section */}
              <div className="flex items-center justify-between group">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Mail className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-base font-medium break-all">
                      {authUser.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Section */}
              <div className="flex items-center justify-between group">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Phone className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 text-base font-medium">
                      {authUser.phoneNumber || "Not set"}
                    </p>
                  </div>
                </div>
                <EditUserNumberModal />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AccountPage;