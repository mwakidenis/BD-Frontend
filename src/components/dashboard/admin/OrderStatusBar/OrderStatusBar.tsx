import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function OrderStatusBar({
  orderStatusData,
}: {
  orderStatusData: { name: string; value: number }[];
}) {
  return (
    <div className="w-full h-96 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow">
      <h2 className=" text-2xl font-semibold mb-4 text-center">
        Order Status Overview
      </h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={orderStatusData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#008000" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
