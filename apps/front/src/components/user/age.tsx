import { useContext } from "react";
import UserContext from "../../router/context";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constants/queryKeys";
import { fetchUser } from "../../services/api";

const Age = () => {
  const { params } = useContext(UserContext);
  const { userId } = params;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: queryKeys.USER(userId),
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 min
    throwOnError: true,
  });

  if (isPending) return "...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <span className="text-red-300 text-xs">
        {data.data.userInfos.age}
        <span>{isFetching ? "..." : ""}</span>
      </span>
    </>
  );
};

export default Age;
