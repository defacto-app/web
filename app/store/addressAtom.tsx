// atoms/pickupModalAtoms.ts
import { useAtomValue, useSetAtom, atom } from "jotai";
import { useCallback } from "react";

// Define the atom to manage modal open/close state
export const modalOpenAtom = atom<boolean>(false);

// Simplify to store just the address string
export const savedAddressAtom = atom<string>('');

// Update handleOnSelect to handle string value
export const handleOnSelectAtom = atom(
  null,
  (get, set) => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const savedData = localStorage.getItem("selectedAddress");
      if (savedData) {
        try {
          const addressData = JSON.parse(savedData);
          // Store only the address string in the atom
          set(savedAddressAtom, addressData.address || '');
        } catch (e) {
          console.error('Error parsing saved address:', e);
        }
      }
    }
  }
);

// Create an atom to reset the modal
export const resetModalAtom = atom(null, (get, set) => {
  set(modalOpenAtom, false);
});

// hooks/useGoogleAddressAtomContext.ts

export const useGoogleAddressAtomContext = () => {
  const modalOpen = useAtomValue(modalOpenAtom);
  const savedAddress = useAtomValue(savedAddressAtom);

  const setModalOpen = useSetAtom(modalOpenAtom);
  const setSavedAddress = useSetAtom(savedAddressAtom);
  const handleOnSelect = useSetAtom(handleOnSelectAtom);
  const resetModal = useSetAtom(resetModalAtom);

  const handleCloseModal = useCallback(() => {
    resetModal();
  }, [resetModal]);

  const openModal = useCallback(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      setModalOpen(true);
    }
  }, [setModalOpen]);

  return {
    modalOpen,
    savedAddress,
    setModalOpen,
    setSavedAddress,
    handleOnSelect,
    handleCloseModal,
    openModal,
  };
};
