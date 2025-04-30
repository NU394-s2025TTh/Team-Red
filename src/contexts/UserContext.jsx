import { createContext, useContext, useState } from "react";
import { useUserData } from "../hooks/useUserData";

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}
