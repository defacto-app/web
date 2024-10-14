import { useEffect, useState } from "react";
import {useSetAtom} from "jotai";
import {toggleRefetchAtom} from "@/app/store/tableAtom";
import {$admin_api} from "@/http/admin-endpoint";
import {toast} from "react-toastify";

export const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};


export const useDeleteUser = () => {
    const triggerRefetch = useSetAtom(toggleRefetchAtom); // Use the atom in the hook

    const deleteUser = async (id: string) => {
        try {
            await $admin_api.users.delete(id);
            toast.success("User deleted successfully");
            triggerRefetch(); // Trigger refetch after deletion
        } catch (error) {
            console.error(error);
            toast.error("Error deleting user");
        }
    };

    return { deleteUser };
};