import React, { useContext } from "react";

import UserContext from "../../router/context";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constants/queryKeys";
import { fetchUser } from "../../services/api";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Activity(): React.ReactNode {
  const { params } = useContext(UserContext);
  const { userId } = params;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: queryKeys.USER(userId),
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 min
  });

  if (isPending || isFetching)
    return (
      <div className="rounded-md bg-stone-50 relative h-[275px] xl:h-[300px] flex items-center justify-center">
        <p className="text-stone-200 text-xs">Chargement...</p>
      </div>
    );

  if (error)
    return (
      <div className="rounded-md bg-stone-50 relative h-[275px] xl:h-[300px] flex items-center justify-center">
        <p className="text-stone-200 text-xs">
          Oups, il y a une erreur : <em>{error.message}</em>
        </p>
      </div>
    );
  return (
    <>
      <div className="bg-stone-50 p-2 rounded-md relative h-[275px] xl:h-[300px]">
        <div className="absolute top-0 left-0 p-6 font-semibold">Score</div>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="value"
              data={[
                { value: data.data.todayScore },
                { value: 1 - data.data.todayScore, color: "#fff" },
              ]}
              cx="50%"
              cy="50%"
              innerRadius="80%"
              outerRadius="90%"
              startAngle={210}
              endAngle={-30}
              stroke="none"
              cornerRadius={10}
            >
              <Cell key={`cell-0`} fill="var(--color-primary)" />
              <Cell key={`cell-1`} fill="#fff" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20">
          <span className="font-bold text-[26px]">
            {data.data.todayScore * 100}%
          </span>{" "}
          <br />
          <small className="text-stone-500 font-medium">
            de votre objectif
          </small>
        </div>
      </div>
    </>
  );
}
