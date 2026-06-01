import { useEffect, useRef, useState } from "react";
import { useSignalR } from "../../features/SignalR/signalRProvider";
import { BoxIconLine, GroupIcon } from "../../icons";

function TrendIcon({ value }: { value: number }) {
  if (value > 0) {
    return (
      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
        <span className="text-xs font-semibold">+{value}</span>
      </div>
    );
  }

  if (value < 0) {
    return (
      <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span className="text-xs font-semibold">{value}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
      <span className="text-xs font-semibold">0</span>
    </div>
  );
}

function useTrend(value: number) {
  const prev = useRef<number>(value);
  const [change, setChange] = useState(0);

  useEffect(() => {
    setChange(value - prev.current);
    prev.current = value;
  }, [value]);

  return change;
}

export default function EcommerceMetrics() {
  const data = useSignalR();

  const productChange = useTrend(data.totalProducts);
  const customerChange = useTrend(data.totalCustomers);
  const orderChange = useTrend(data.totalOrders);

  const kpis = [
    {
      title: "Toplam Ürün",
      value: data.totalProducts,
      icon: <BoxIconLine className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      change: productChange,
      gradient: "from-blue-50 to-white dark:from-gray-800 dark:to-gray-900",
      border: "border-blue-100 dark:border-gray-700",
    },
    {
      title: "Toplam Müşteri",
      value: data.totalCustomers,
      icon: <GroupIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      change: customerChange,
      gradient: "from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900",
      border: "border-emerald-100 dark:border-gray-700",
    },
    {
      title: "Toplam Sipariş",
      value: data.totalOrders,
      icon: <BoxIconLine className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      change: orderChange,
      gradient: "from-purple-50 to-white dark:from-gray-800 dark:to-gray-900",
      border: "border-purple-100 dark:border-gray-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {kpis.map((item, i) => (
        <div
          key={i}
          className={`
            relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5
            shadow-sm transition-all duration-300
            hover:-translate-y-1 hover:shadow-xl
            ${item.gradient} ${item.border}
          `}
        >
          {/* glow */}
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/40 dark:bg-white/10 blur-2xl" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {item.title}
            </span>
            {item.icon}
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {item.value ?? 0}
            </div>

            <TrendIcon value={item.change} />
          </div>

          <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            {/* ekstra bilgi alanı */}
          </div>
        </div>
      ))}
    </div>
  );
}