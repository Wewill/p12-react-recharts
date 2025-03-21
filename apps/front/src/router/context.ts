import { createContext } from "react";

const UserContext = createContext({
  currentPath: window.location.pathname,
  params: {} as { userId: number },
});

export default UserContext;
