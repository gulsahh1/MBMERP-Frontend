import { createContext, useContext, useEffect, useState } from "react";
import connection from "./signalRClient";

export interface DashboardData {
  totalProducts: number;
  totalCustomers: number;
  totalOrders: number;

  dailySales: any[];
  orderTrends: any[];

  stockMovements: any[];
  categorySales: any[];
  topProducts: any[];
}

const SignalRContext = createContext<DashboardData | null>(null);

export function SignalRProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardData>({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,

    dailySales: [],
    orderTrends: [],

    stockMovements: [],
    categorySales: [],
    topProducts: [],
  });

  useEffect(() => {
    let mounted = true;

    const start = async () => {
      try {
        connection.off("dashboard:update");

        connection.on("dashboard:update", (res: DashboardData) => {
          // console.log("🔥 DASHBOARD:", res);

          if (mounted) {
            setData({
              totalProducts: res.totalProducts ?? 0,
              totalCustomers: res.totalCustomers ?? 0,
              totalOrders: res.totalOrders ?? 0,

              dailySales: res.dailySales ?? [],
              orderTrends: res.orderTrends ?? [],

              stockMovements: res.stockMovements ?? [],
              categorySales: res.categorySales ?? [],
              topProducts: res.topProducts ?? [],
            });
          }
        });

        if (connection.state === "Disconnected") {
          await connection.start();
        }

        await connection.invoke("GetDashboard");
      } catch (err) {
        console.log("SignalR error:", err);
      }
    };

    start();

    return () => {
      mounted = false;
      connection.off("dashboard:update");
    };
  }, []);

  return (
    <SignalRContext.Provider value={data}>
      {children}
    </SignalRContext.Provider>
  );
}

export function useSignalR() {
  const ctx = useContext(SignalRContext);
  if (!ctx) throw new Error("SignalRProvider yok");
  return ctx;
}