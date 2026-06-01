import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7", "#ef4444"];

export default function CategorySalesChart({ data }: any) {
  const safeData = data ?? [];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
      
      <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">
        Kategori Bazında Satışlar
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={safeData}
              dataKey="totalRevenue"
              nameKey="categoryName"
              outerRadius={100}
              label
            >
              {safeData.map((_: any, index: number) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#fff",
              }}
              labelStyle={{ color: "#9ca3af" }}
            />

          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}