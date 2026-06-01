import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TopProductsChart({ data = [] }: any) {
  const safeData = data.filter((x: any) => x.productName);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
      
      <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">
        En Çok Satan Ürünler
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={safeData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
            />

            <XAxis
              dataKey="productName"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              width={80}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#fff",
              }}
              labelStyle={{ color: "#9ca3af" }}
            />

            <Bar dataKey="totalRevenue" fill="#8b5cf6" />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}