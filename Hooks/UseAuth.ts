import { userProps } from "@/types";
import { createContext } from "react";

export const UserAuth = createContext<userProps | undefined>(undefined);