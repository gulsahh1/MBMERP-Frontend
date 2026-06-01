import { useEffect, useState } from "react";
import connection from "../SignalR/signalRClient";

export interface DashboardData {
  totalProducts: number;
  totalCustomers: number;
  totalOrders: number;

  //  dailySales: DailySalesDto[];
  // orderTrends: OrderTrendDto[];
}

export interface DailySalesDto {
  date: string;
  totalSales: number;
  orderCount: number;
}

export interface OrderTrendDto {
  date: string;
  thisWeekOrders: number;
  lastWeekOrders: number;
}

export const useSignalR = () => {

  const [data, setData] = useState<DashboardData>({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    // dailySales: [],
    // orderTrends: [],
  });


  useEffect(() => {

    let mounted = true;

    const startConnection = async () => {

      try {

        // EVENT ÖNCE
        connection.off("dashboard:update");

        connection.on("dashboard:update", (res: DashboardData) => {

          console.log("🔥 REALTIME DATA:", res);

          if (mounted) {
            setData(res);
          }
        });

        // ZATEN BAĞLI MI?
        if (connection.state === "Disconnected") {

          await connection.start();

          console.log("✅ SignalR Connected");
        }

        // CONNECTED DEĞİLSE BEKLE
        const waitForConnection = async () => {

          while (connection.state !== "Connected") {

            console.log("⏳ waiting connection...");

            await new Promise(resolve => setTimeout(resolve, 100));
          }
        };

        await waitForConnection();

        // İLK VERİYİ ÇEK
        await connection.invoke("GetDashboard");

      } catch (err) {

        console.log("❌ SIGNALR ERROR:", err);
      }
    };

    startConnection();

    return () => {

      mounted = false;

      connection.off("dashboard:update");
    };

  }, []);

  return data;
};