import React, { useContext } from "react";

import UserContext from "../../router/context";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../services/queryKeys";
import { fetchUser } from "../../services/api";

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

export default function Activity(): React.ReactNode {
  const { params } = useContext(UserContext);
  const { userId } = params;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [queryKeys.USER, userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 min
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <>
      {isFetching ? "..." : ""}
      {isPending ? "isPending..." : ""}
      {error ? "Error : " + error : ""}

      <div
        className="rounded-md bg-gray-800"
        style={{ width: "100%", height: 300 }}
      >
        <ResponsiveContainer>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={[
                { value: data.data.todayScore },
                { value: 1 - data.data.todayScore },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={80}
              fill="#8884d8"
              label
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
