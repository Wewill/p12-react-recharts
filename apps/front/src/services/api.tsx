import { userData } from "../types/data";

/* User */
export const fetchUser = async (userId: number): Promise<userData> => {
  const response = await fetch("http://localhost:3000/user/" + userId);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};
