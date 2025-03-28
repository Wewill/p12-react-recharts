import React, { useContext } from "react";

import UserContext from "../../router/context";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constants/queryKeys";
import { fetchPerformance } from "../../services/api";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function Performance(): React.ReactNode {
  const { params } = useContext(UserContext);
  const { userId } = params;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [queryKeys.PERFORMANCE, userId],
    queryFn: () => fetchPerformance(userId),
    staleTime: 5 * 60 * 1000, // 5 min
  });

  if (isPending) return "...";

  if (error) return "An error has occurred: " + error.message;

  // Format data for recharts
  const formattedData = Formatter.formatPerformance(data);

  return (
    <>
      {isFetching ? "..." : ""}
      {isPending ? "isPending..." : ""}
      {error ? "Error : " + error : ""}

      <div className="rounded-md bg-content relative p-2 h-[275px] xl:h-[300px]">
        <div className="absolute top-0 left-0 p-6 font-semibold text-white hidden">
          Performance
        </div>
        <ResponsiveContainer>
          <RadarChart outerRadius="60%" data={formattedData}>
            <PolarGrid gridType="polygon" radialLines={false} stroke="white" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "white", fontSize: 12 }}
            />
            {/* <PolarRadiusAxis
              angle={30}
              domain={[minValue, maxValue]}
              stroke="green"
            /> */}
            <Radar
              dataKey="grade"
              fill="var(--color-primary)"
              fillOpacity={0.8}
            />
            <Tooltip
              animationEasing="ease-out"
              content={<RadarCustomTooltip />}
              offset={55}
              wrapperStyle={{ outline: "none" }}
            />
          </RadarChart>
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

const RadarCustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-md shadow-md text-xs">
        <p className="font-semibold">
          {`Type de performance: ${payload[0].payload.subject}`}
        </p>
        <p className="">
          {`Degré de performance: ${payload[0].payload.grade}/250`}
        </p>
      </div>
    );
  }

  return null;
};
