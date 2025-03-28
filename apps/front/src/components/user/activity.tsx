import React, { useContext } from "react";

import UserContext from "../../router/context";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constants/queryKeys";
import { fetchActivity } from "../../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Activity(): React.ReactNode {
  const { params } = useContext(UserContext);
  const { userId } = params;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [queryKeys.ACTIVITY, userId],
    queryFn: () => fetchActivity(userId),
    staleTime: 5 * 60 * 1000, // 5 min
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // Format data for recharts
  const formattedData = Formatter.formatActivity(data);

  return (
    <>
      {isFetching ? "..." : ""}
      {isPending ? "isPending..." : ""}
      {error ? "Error : " + error : ""}
      <div className="rounded-md bg-stone-50 relative h-[275px] xl:h-[360px]">
        <div className="absolute top-0 left-0 p-6 font-semibold flex justify-between w-full">
          <span className="flex-1">Activité quotidienne</span>
          <span className="text-stone-500">
            <span>•</span> Poids (kg)
          </span>
          <span className="text-stone-500">
            <span className="text-red-500">•</span> Calories brûlées (kCal)
          </span>
        </div>

        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={formattedData}
            margin={{
              top: 64,
              right: 4,
              left: 25,
              bottom: 4,
            }}
          >
            <CartesianGrid
              strokeDasharray="2 2"
              horizontal={true}
              vertical={false}
            />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis orientation="right" tickLine={false} axisLine={false} />
            <Tooltip
              animationEasing="ease-out"
              content={<BarsCustomTooltip payload={formattedData} />}
              offset={40}
              wrapperStyle={{ outline: "none" }}
            />

            <Bar
              dataKey="pv"
              fill="var(--bg-color)"
              radius={[10, 10, 0, 0]}
              barSize={10}
            />
            <Bar
              dataKey="uv"
              fill="var(--color-primary)"
              radius={[10, 10, 0, 0]}
              barSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

import { TooltipProps } from "recharts";
// for recharts v2.1 and above
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import Formatter from "../../services/formatter";

const BarsCustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="--bg-white bg-main p-3 rounded-md shadow-md text-xs">
        <p className="--text-stone-500 text-white font-semibold">
          {`${payload[0].payload.pv} kg`}
        </p>
        <p className="--text-stone-500 text-white">
          {" "}
          {`${payload[0].payload.uv} Kcal`}
        </p>
      </div>
    );
  }

  return null;
};
