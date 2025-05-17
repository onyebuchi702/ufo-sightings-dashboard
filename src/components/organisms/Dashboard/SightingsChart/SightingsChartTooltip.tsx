import { CustomTooltipProps } from "./SightingsChart.type";

export const SightingsChartTooltip = ({
  active,
  payload,
}: CustomTooltipProps) => {
  if (
    active &&
    payload &&
    Array.isArray(payload) &&
    payload.length > 0 &&
    payload[0].payload
  ) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-md rounded">
        <p className="font-medium">{data.formattedDate}</p>
        <p className="text-blue-600">
          {data.count} {data.count === 1 ? "Sighting" : "Sightings"}
        </p>
      </div>
    );
  }
  return null;
};
