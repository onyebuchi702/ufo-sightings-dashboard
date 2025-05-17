"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SightingsChartProps } from "./SightingsChart.type";
import { SightingsChartTooltip } from "./SightingsChartTooltip";

export const SightingsChart = ({
  weekData,
  isLoading,
}: SightingsChartProps) => {
  if (!weekData || isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          {isLoading ? "Loading data..." : "No data available for this week"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={weekData.days}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="formattedDate"
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <Tooltip content={<SightingsChartTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Bar
            name="UFO Sightings"
            dataKey="count"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            barSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
