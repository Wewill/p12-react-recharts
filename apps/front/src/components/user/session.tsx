import React, { useContext } from "react";

import UserContext from "../../router/context";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../services/queryKeys";
import { fetchSessions } from "../../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
  const formattedData: SessionItem[] = Object.keys(data.data.sessions).map(
    (key: string) => ({
      name: data.data.sessions[Number(key)]?.day,
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
        className="rounded-md bg-gray-800"
        style={{ width: "100%", height: 300 }}
      >
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={300}
            data={formattedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
