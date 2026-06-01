import { useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";
import { Notification } from "../types/Notification";
import { NotificationType } from "../../../Enums/notificationType";
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (err) {
        console.log("Notification load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const getColor = (type: NotificationType) => {
    switch (type) {
      case NotificationType.OrderCreated:
        return "bg-blue-500";
      case NotificationType.ProductCreated:
        return "bg-green-500";
      case NotificationType.CustomerCreated:
        return "bg-purple-500";
      case NotificationType.StockChanged:
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Tüm Bildirimler
        </h1>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {notifications.length} bildirim
        </span>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-gray-500 dark:text-gray-400">
          Yükleniyor...
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">
          Bildirim yok
        </div>
      ) : (
        <div className="space-y-3">

          {notifications.map((n) => (
            <div
              key={n.notificationID}
              className="
                flex gap-3 p-4 rounded-xl
                border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800
                hover:bg-gray-50 dark:hover:bg-gray-700
                transition
              "
            >

              {/* TYPE INDICATOR */}
              <div className={`w-2 rounded-full ${getColor(n.type)}`} />

              {/* CONTENT */}
              <div className="flex-1">

                <div className="flex justify-between items-center">

                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                    {n.title}
                  </h3>

                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(n.createdDate).toLocaleString("tr-TR")}
                  </span>

                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {n.message}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}