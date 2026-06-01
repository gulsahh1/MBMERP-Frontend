import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { useSignalR } from "../../features/SignalR/signalRProvider";

export default function DashboardCharts() {
  const data = useSignalR();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

      {/* 📊 DAILY SALES */}
      <div className="h-80 rounded-3xl border border-blue-100 dark:border-gray-700 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 p-5">

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Günlük Satışlar
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Canlı satış performansı
          </p>
        </div>

        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={data.dailySales || []}>

            <defs>
              <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#374151" />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#9ca3af" }}
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

            <Area
              type="monotone"
              dataKey="totalSales"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#sales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 📈 ORDER TREND */}
      <div className="h-80 rounded-3xl border border-purple-100 dark:border-gray-700 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 p-5">

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Sipariş Eğilimi
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Haftalık karşılaştırma
          </p>
        </div>

        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={data.orderTrends || []}>

            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#374151" />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#9ca3af" }}
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

            <Legend />

            <Line
              type="monotone"
              dataKey="buHaftakiSiparisler"
              stroke="#a855f7"
              strokeWidth={3}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="gecenHaftakiSiparisler"
              stroke="#ec4899"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}