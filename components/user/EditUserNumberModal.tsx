import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Call Line
            </Label>
            <Input
            className='w-full'
            type="tel"
                    name="phone-number"
                    id="phone-number"
                    autoComplete="tel"
                  />
          </div>

        </div>
        <DialogFooter>
          <Button type="submit" variant="primary">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
    </div>
  )
}
