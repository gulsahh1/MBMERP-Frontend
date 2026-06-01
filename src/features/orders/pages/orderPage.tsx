import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { getCustomers } from "../../customers/services/customerService";
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
} from "../services/orderService";

import { Order } from "../types/Order";
import OrderForm from "../components/orderForm";
import OrderModal from "../components/orderModal";
import OrderDetailInline from "../components/orderDetailInline";
import OrderDetailModal from "../components/orderDetailModal";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [expandedOrderID, setExpandedOrderID] = useState<number | null>(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedOrderID, setSelectedOrderID] = useState<number | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<any | null>(null);
  const [detailRefresh, setDetailRefresh] = useState(0);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    loadOrders();
    loadCustomers();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedOrder) {
        await updateOrder(data);
        toast.success("Sipariş güncellendi");
      } else {
        await createOrder(data);
        toast.success("Sipariş oluşturuldu");
      }

      setOpen(false);
      setSelectedOrder(null);
      loadOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const customerMap = Object.fromEntries(
    customers.map((c) => [c.customerID, c.customerName])
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((o) =>
      (customerMap[o.customerID] || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [orders, customers, search]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize);

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, page]);

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-auto rounded-2xl bg-white dark:bg-gray-900 p-6">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Sipariş Yönetimi
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Siparişleri görüntüle, düzenle ve yönet.
          </p>
        </div>
      </div>

      {/* SEARCH + BUTTON */}
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Sipariş ara..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-3 pl-11 text-sm text-gray-800 dark:text-white outline-none focus:border-blue-500"
          />
          <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
        </div>

        <button
          className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
          onClick={() => {
            setOpen(true);
            setSelectedOrder(null);
          }}
        >
          + Sipariş Ekle
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">#</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Müşteri</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Sipariş No</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-800 dark:text-white">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders.map((order, index) => {
              const rowNumber = (page - 1) * pageSize + index + 1;

              return (
                <>
                  <tr
                    key={order.orderID}
                    className={`border-t hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {rowNumber}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                      {customerMap[order.customerID]}
                    </td>

                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {order.orderNumber}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">

                        <button
                          onClick={() =>
                            setExpandedOrderID(
                              expandedOrderID === order.orderID
                                ? null
                                : order.orderID
                            )
                          }
                          className="rounded-xl bg-blue-100 dark:bg-blue-500/20 px-3 py-2 text-blue-600"
                        >
                          {expandedOrderID === order.orderID ? "▲" : "▼"}
                        </button>

                        <button
                          onClick={() => {
                            setSelectedOrder({ ...order });
                            setOpen(true);
                          }}
                          className="rounded-xl bg-amber-100 dark:bg-amber-500/20 px-3 py-2 text-amber-600"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={async () => {
                            if (window.confirm("Silinsin mi?")) {
                              await deleteOrder(order.orderID);
                              loadOrders();
                            }
                          }}
                          className="rounded-xl bg-rose-100 dark:bg-rose-500/20 px-3 py-2 text-rose-600"
                        >
                          🗑
                        </button>

                      </div>
                    </td>
                  </tr>

                  {expandedOrderID === order.orderID && (
                    <tr>
                      <td colSpan={4} className="bg-gray-50 dark:bg-gray-900 p-4">
                        <OrderDetailInline
                          orderID={order.orderID}
                          refresh={detailRefresh}
                          onAdd={() => {
                            setSelectedOrderID(order.orderID);
                            setSelectedDetail(null);
                            setDetailOpen(true);
                          }}
                          onEdit={(detail: any) => {
                            setSelectedOrderID(order.orderID);
                            setSelectedDetail(detail);
                            setDetailOpen(true);
                          }}
                        />
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col gap-3 border-t bg-gray-50 dark:bg-gray-900 px-6 py-4 md:flex-row md:items-center md:justify-between mt-4">

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Toplam{" "}
          <span className="font-semibold text-gray-800 dark:text-white">
            {filteredOrders.length}
          </span>{" "}
          sipariş
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Sayfa {page} / {totalPages || 1}
        </div>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-xl border px-4 py-2 text-sm text-gray-800 dark:text-white disabled:opacity-40"
          >
            Geri
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-xl border px-4 py-2 text-sm text-gray-800 dark:text-white disabled:opacity-40"
          >
            İleri
          </button>
        </div>
      </div>

      {/* MODALS */}
      <OrderModal open={open} onClose={() => setOpen(false)}>
        <OrderForm
          onSave={handleSave}
          initialData={selectedOrder}
          customers={customers}
        />
      </OrderModal>

      <OrderDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        orderID={selectedOrderID}
        selectedDetail={selectedDetail}
        onSaved={() => setDetailRefresh((p) => p + 1)}
      />
    </div>
  );
}