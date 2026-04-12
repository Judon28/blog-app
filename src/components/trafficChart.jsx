import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function TrafficChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >

            <CartesianGrid
            vertical={false}
            stroke="#f1f5f9"
            strokeDasharray="3 3"
            />

            <XAxis
            dataKey="date"
            tick={{ fill: "#fff" }}
            axisLine={{ stroke: "#fff" }}
            tickLine={false}
            />

            <YAxis
            tick={{ fill: "#fff" }}
            axisLine={{ stroke: "#fff" }}
            tickLine={false}
            />

            <Tooltip
            contentStyle={{ backgroundColor: "#000", border: "none" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            />

            <Line
            type="monotone"
            dataKey="views"
            stroke="#fff"
            strokeWidth={2}
            //dot={false}
            //dot={{ fill: "#facc15" }}
            dot={{
                fill: "#facc15",
                stroke: "#facc15",
                strokeWidth: 2
            }}
            />

        </LineChart>
    </ResponsiveContainer>
  );
}