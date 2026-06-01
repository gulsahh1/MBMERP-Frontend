import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import notificationConnection from "../../features/SignalR/notificationClient";

type Notification = {
  id: number;
  title: string;
  message: string;
  type: string;
  time: string;
  isRead: boolean;
};

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const startConnection = async () => {
      notificationConnection.on("ReceiveNotification", (data) => {
        const newNotification: Notification = {
          id: Date.now(),
          title: data.title,
          message: data.message,
          type: data.type,
          time: "şimdi",
          isRead: false,
        };

        setNotifications((prev) => [newNotification, ...prev]);
      });

      if (notificationConnection.state === "Disconnected") {
        try {
          await notificationConnection.start();
        } catch (err) {
          console.log(err);
        }
      }
    };

    startConnection();

    return () => {
      notificationConnection.off("ReceiveNotification");
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const getColor = (type: string) => {
    switch (type) {
      case "OrderCreated":
        return "bg-blue-500";
      case "ProductCreated":
        return "bg-green-500";
      case "CustomerCreated":
        return "bg-purple-500";
      case "StockChanged":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="relative">

      {/* ICON */}
      <button
        onClick={toggleDropdown}
        className="
          relative flex items-center justify-center
          w-11 h-11 rounded-full
          border border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-900
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition
          text-gray-800 dark:text-white
        "
      >
        🔔

        {notifications.filter(n => !n.isRead).length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* DROPDOWN */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="
          absolute right-0 mt-3 w-[380px]
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          rounded-xl shadow-xl
        "
      >

        {/* HEADER */}
        <div className="
          p-3 border-b
          border-gray-200 dark:border-gray-700
          flex justify-between
        ">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Bildirimler
          </h3>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {notifications.filter(n => !n.isRead).length} yeni
          </span>
        </div>

        {/* LIST */}
        <ul className="max-h-[420px] overflow-y-auto">

          {notifications.map((n) => (
            <DropdownItem
              key={n.id}
              onItemClick={closeDropdown}
              className="
                p-3 border-b
                border-gray-100 dark:border-gray-800
                hover:bg-gray-100 dark:hover:bg-gray-800
                cursor-pointer transition
              "
            >
              <div className="flex gap-3">

                <div className={`w-2 h-10 rounded-full ${getColor(n.type)}`} />

                <div className="flex-1">

                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {n.title}
                    </span>

                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {n.time}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {n.message}
                  </p>

                </div>

              </div>
            </DropdownItem>
          ))}

        </ul>

        {/* FOOTER */}
        <div
          className="
            p-2 text-center text-xs
            text-gray-500 dark:text-gray-400
            border-t border-gray-200 dark:border-gray-700
            cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800
            transition
          "
          onClick={() => {
            navigate("/notifications");
            setIsOpen(false);
          }}
        >
          Tüm bildirimler
        </div>

      </Dropdown>
    </div>
  );
}