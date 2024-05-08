import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneNumberValidation from "@/components/PhoneNo";

export default function ReceiverModal() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <ChevronRightIcon />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-primary-600 text-3xl">
              Receiver Details
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone-number" className="text-right">
                  Call Line
                </Label>
                    <Input
                      id="number"
                      name="number"
                      type="number"
                      placeholder="090*******"
                      required
                      className="col-span-3"
                    />
              </div>
            </div>
          </div>
         <div className="grid place-content-center">
         <DialogFooter className="grid place-content-center">
            <Button type="submit" variant="primary">
              Save changes
            </Button>
          </DialogFooter>
         </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
