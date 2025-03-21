import { useQuery } from "@tanstack/react-query";

/* Users */
const fetchUsers = async () => {
  const response = await fetch("data.js");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json(); //USER_MAIN_DATA
};

export const useGetUsers = () => {
  return useQuery({ queryKey: ["getUsers"], queryFn: fetchUsers });
};

/* User */
const fetchUser = async (userId: number) => {
  const response = await fetch("data.js/" + userId);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json(); //USER_MAIN_DATA
};

export const useGetUser = (userId: number) => {
  return useQuery({
    queryKey: ["getUser", userId],
    queryFn: () => fetchUser(userId),
  });
};
