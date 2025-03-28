import React, { useContext } from "react";

import UserContext from "../../router/context";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constants/queryKeys";
import { fetchSessions } from "../../services/api";

import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function Session(): React.ReactNode {
  const { params } = useContext(UserContext);
  const { userId } = params;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [queryKeys.SESSION, userId],
    queryFn: () => fetchSessions(userId),
    staleTime: 5 * 60 * 1000, // 5 min
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // Format the data for the chart
  interface SessionItem {
    name: string;
    pv: number;
  }

  const getDayName = (dayNumber: number): string => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    return days[dayNumber];
  };

  const formattedData: SessionItem[] = Object.keys(data.data.sessions).map(
    (key: string) => ({
      name: getDayName(data.data.sessions[Number(key)]?.day - 1),
      pv: data.data.sessions[Number(key)]?.sessionLength,
    })
  );

  // console.log(data);
  // console.log(formattedData);

  return (
    <>
      {isFetching ? "..." : ""}
      {isPending ? "isPending..." : ""}
      {error ? "Error : " + error : ""}

      <div
        className="rounded-md bg-main relative"
        style={{ width: "100%", height: 300 }}
      >
        <div className="absolute top-0 left-0 p-6 font-semibold text-white opacity-80">
          Durée moyenne des sessions
        </div>
        <ResponsiveContainer>
          <AreaChart
            data={formattedData}
            margin={{ top: 60, right: 20, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-secondary)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="pv"
              axisLine={false}
              tickLine={false}
              stroke="#fff"
              // padding={{ left: 0, right: 0 }}
            />
            <YAxis dataKey="pv" hide />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#fff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMin)"
            />

            <Tooltip
              animationEasing="ease-out"
              content={<LineCustomTooltip />}
              wrapperStyle={{ outline: "none" }}
            />
          </AreaChart>
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

const LineCustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-md shadow-md text-xs">
        <p className="font-semibold"> {`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};
