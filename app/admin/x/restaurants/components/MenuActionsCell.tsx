// MenuActionsCell.tsx
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { $admin_api } from "@/http/admin-endpoint";

interface MenuActionsCellProps {
    item: {
        publicId: string;
        available: boolean;
    };
    onUpdate?: () => void;
}

export function MenuActionsCell({ item, onUpdate }: MenuActionsCellProps) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleAvailabilityToggle = async () => {
        setIsUpdating(true);
        try {
            await $admin_api.menu.update(item.publicId, {
                ...item,
                available: !item.available
            });
            toast.success("Availability updated");
            onUpdate?.();
        } catch (error) {
            toast.error("Failed to update availability");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            await $admin_api.menu.delete(item.publicId);
            toast.success("Item deleted successfully");
            onUpdate?.();
        } catch (error) {
            toast.error("Failed to delete item");
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={item.available}
                onCheckedChange={handleAvailabilityToggle}
                disabled={isUpdating}
                aria-label="Toggle availability"
            />
            <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

// Then in your table definition:
