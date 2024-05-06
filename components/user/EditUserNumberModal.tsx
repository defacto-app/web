import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EditUserNumberModal() {
  return (
    <div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit</DialogTitle>
              <DialogDescription>
                Change your phone number here and click save when done
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="items-center gap-4">
                <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>

                      <option className='text-primary-600'>NG</option>
                  </div>
                  <input
                    type="tel"
                    name="phone-number"
                    id="phone-number"
                    className="block w-full rounded-md border-gray-300 py-1.5 pl-16 pr-3 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:ring focus:ring-opacity-50 sm:text-sm"
                    placeholder="+234 (81) 987-6543"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" variant="primary">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
