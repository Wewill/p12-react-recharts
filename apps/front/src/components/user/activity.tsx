import React, { useContext } from "react";

import UserContext from "../../router/context";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../services/queryKeys";
import { fetch } from "../../services/api";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Activity(): React.ReactNode {
  const { params } = useContext(UserContext);
  const { userId } = params;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [queryKeys.PERFORMANCE, userId],
    queryFn: () => fetchPerformance(userId),
    staleTime: 5 * 60 * 1000, // 5 min
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // Init chart
  const minValue: number = 0;
  const maxValue: number = 250;

  // Format the data for the radar chart
  interface RadarItem {
    subject: string;
    grade: number;
    fullMark: number;
  }
  const formattedData: RadarItem[] = Object.keys(data.data.data).map(
    (key: string) => ({
      subject: data.data.kind[data.data.data[Number(key)]?.kind] as string,
      grade: data.data.data[Number(key)]?.value,
      fullMark: 250,
    })
  );

  console.log(data);
  console.log(formattedData);

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
          <RadarChart
            outerRadius={90}
            width={250}
            height={250}
            data={formattedData}
          >
            <PolarGrid stroke="var(--bg-color)" />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis
              angle={30}
              domain={[minValue, maxValue]}
              stroke="var(--bg-color)"
            />
            <Radar
              dataKey="grade"
              fill="var(--color-primary)"
              fillOpacity={0.7}
            />
            <Tooltip
              animationEasing="ease-out"
              content={<RadarCustomTooltip payload={formattedData} />}
              offset={55}
              wrapperStyle={{ outline: "none" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

function RadarCustomTooltip({
  payload,
  active,
}: {
  payload: any;
  active: boolean;
}): React.ReactNode | null {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <>
      <div className="tool-tip__radar-chart">
        <p className="tool-tip__radar-chart-text">
          {`Type de performance: ${payload[0].payload.subject}`}
        </p>
        <p className="tool-tip__radar-chart-text">
          {`Degré de performance: ${payload[0].payload.grade}/250`}
        </p>
      </div>
    </>
  );
}
