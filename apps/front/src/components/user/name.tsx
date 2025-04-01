import { useContext } from "react";
import UserContext from "../../router/context";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constants/queryKeys";
import { fetchUser } from "../../services/api";

const Name = () => {
  const { params } = useContext(UserContext);
  const { userId } = params;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: queryKeys.USER(userId),
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 min
    throwOnError: true,
  });

  if (isPending || isFetching) return "...";

  if (error) return "?";

  return (
    <>
      <span className="text-red-500">{data.data.userInfos.firstName}</span>
    </>
  );
};

export default Name;
