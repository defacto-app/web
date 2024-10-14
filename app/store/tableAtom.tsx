import { atom } from "jotai";
import { useAtomValue, useSetAtom } from "jotai";

// Atom to track when a refetch is required
export const shouldRefetchAtom = atom(false);

// Action atom to toggle refetch
export const toggleRefetchAtom = atom(
    null,
    (get, set) => {
        set(shouldRefetchAtom, !get(shouldRefetchAtom));
    }
);



export const useRefetchContext = () => {
    // Read-only atom access
    const shouldRefetch = useAtomValue(shouldRefetchAtom);

    // Setter atom access
    const triggerRefetch = useSetAtom(toggleRefetchAtom); // This toggles the refetch state

    return {
        shouldRefetch,
        triggerRefetch,
    };
};
