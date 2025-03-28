import { useContext } from "react";
import UserContext from "../../router/context";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constants/queryKeys";
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
    icon: "calorie",
  },
  proteinCount: {
    label: "Protéines",
    suffix: "g",
    icon: "protein",
  },
  carbohydrateCount: {
    label: "Glucides",
    suffix: "g",
    icon: "carbohydrate",
  },
  lipidCount: {
    label: "Lipides",
    suffix: "g",
    icon: "lipid",
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

  if (isPending) return "...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="bg-stone-50 p-8 xl:p-10 rounded-md mb-2 xl:mb-4">
        <div className="flex items-center gap-4 xl:gap-8">
          <Icon
            iconType={keyDataTypes[type].icon}
            variant={variant}
            size={20}
            elClass="p-6"
          />

          <div>
            <h4 className="font-bold text-2xl">
              {data.data.keyData[type]}
              {keyDataTypes[type].suffix}
              <span>{isFetching ? "..." : ""}</span>
            </h4>
            <p className="text-stone-500 font-medium">
              {keyDataTypes[type].label}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Count;
