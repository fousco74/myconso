import { Index } from "@/types";

interface data {
  message: string;
  data: Index[];
}

export const getAllIndexes = async () => {
  const data: data = await fetch("/api/index").then((res) => res.json());    
  return data.data;
};