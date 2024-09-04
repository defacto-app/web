// src/store/userAtoms.js
import { atom } from 'jotai';

export const userDetailsAtom = atom({
    name: "John",
    email: "johndoe@example.com",
    phone: "123-456-7890",
});

export const userAtom = atom({});
export const isLoggedInAtom = atom(false);
