import { useContext } from "react";
import UserContext from "../../router/context";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../services/queryKeys";
import { fetchUser } from "../../services/api";

import Icon from "../icon/icon";

interface CountProps {
  type: "calorieCount" | "proteinCount" | "carbohydrateCount" | "lipidCount";
  variant: "warning" | "info" | "notice" | "danger";
}

const keyDataTypes = {
  calorieCount: {
    label: "Calories",
    suffix: "kCal",
  },
  proteinCount: {
    label: "Protéines",
    suffix: "g",
  },
  carbohydrateCount: {
    label: "Glucides",
    suffix: "g",
  },
  lipidCount: {
    label: "Lipides",
    suffix: "g",
  },
};

const Count = ({ type, variant }: CountProps) => {
  const { params } = useContext(UserContext);
  const { userId } = params;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [queryKeys.USER, userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 min
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="bg-stone-100 p-8 rounded-md mb-8">
        <span className={variantColors[variant]?.textColor}>
          {data.data.keyData[type]}
          <span>{isFetching ? "..." : ""}</span>
        </span>
        <div className="flex items-center gap-4">
          <Icon />
          <div>
            <h4 className="font-bold text-2xl">
              {data.data.keyData[type]}
              {keyDataTypes[type].suffix}
            </h4>
            <p className="text-stone-500">{keyDataTypes[type].label}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Count;
