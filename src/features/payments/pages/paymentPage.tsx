import { useEffect, useMemo, useState } from "react";
import { Payment } from "../types/Payment";
import toast from "react-hot-toast";

import {
  createPayment,
  deletePayment,
  getPayments,
  updatePayment,
} from "../services/paymentService";

import CustomerModal from "../../customers/components/customerModal";
import CustomerForm from "../components/paymentForm";
import { getCustomers } from "../../customers/services/customerService";

export default function PaymentPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    loadPayments();
    loadCustomers();
  }, []);

  const loadPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
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
      if (selectedPayment) {
        await updatePayment(data);
        toast.success("Ödeme güncellendi");
      } else {
        await createPayment(data);
        toast.success("Ödeme eklendi");
      }

      setOpen(false);
      setSelectedPayment(null);
      loadPayments();
    } catch (error) {
      console.error(error);
    }
  };

  const customerMap = Object.fromEntries(
    customers.map((c) => [c.customerID, c.customerName])
  );

  const paymentTypeMap: any = {
    1: "Nakit",
    2: "Kredi Kartı",
    3: "Banka Transferi",
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("tr-TR");

  const filteredPayments = useMemo(() => {
    return payments.filter((p) =>
      (customerMap[p.customerID] || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [payments, search, customers]);

  const totalPages = Math.ceil(filteredPayments.length / pageSize);

  const paginatedPayments = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredPayments.slice(start, start + pageSize);
  }, [filteredPayments, page]);

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-auto rounded-2xl bg-white dark:bg-gray-900 p-6">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Ödeme Yönetimi
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Ödemeleri görüntüle, yönet ve düzenle.
          </p>
        </div>
      </div>

      {/* SEARCH + BUTTON */}
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Ödeme ara..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800 px-2 py-3 pl-11 text-sm text-gray-800 dark:text-white
            outline-none focus:border-blue-500 dark:focus:bg-gray-800"
          />
          <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
        </div>

        <button
          className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
          onClick={() => {
            setOpen(true);
            setSelectedPayment(null);
          }}
        >
          + Ödeme Ekle
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">#</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Müşteri</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Tutar</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Tarih</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Tür</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-800 dark:text-white">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {paginatedPayments.map((payment, index) => {
              const rowNumber = (page - 1) * pageSize + index + 1;

              return (
                <tr
                  key={payment.paymentID}
                  className={`border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-900"
                  }`}
                >
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {rowNumber}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    {customerMap[payment.customerID]}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    ₺ {payment.amount}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    {formatDate(payment.date)}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    {paymentTypeMap[payment.paymentType] || "Bilinmiyor"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">

                      <button
                        onClick={() => {
                          setSelectedPayment({ ...payment });
                          setOpen(true);
                        }}
                        className="rounded-xl bg-amber-100 dark:bg-amber-500/20 px-3 py-2 text-amber-600 dark:text-amber-300"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={async () => {
                          if (window.confirm("Silinsin mi?")) {
                            await deletePayment(payment.paymentID);
                            loadPayments();
                          }
                        }}
                        className="rounded-xl bg-rose-100 dark:bg-rose-500/20 px-3 py-2 text-rose-600 dark:text-rose-300"
                      >
                        🗑
                      </button>

                    </div>
                  </td>
                </tr>
              );
            })}

            {paginatedPayments.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-400 dark:text-gray-500">
                  Kayıt bulunamadı
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col gap-3 border-t bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 px-6 py-4 md:flex-row md:items-center md:justify-between mt-4">

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Toplam{" "}
          <span className="font-semibold text-gray-800 dark:text-white">
            {filteredPayments.length}
          </span>{" "}
          ödeme
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Sayfa {page} / {totalPages || 1}
        </div>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-xl border px-4 py-2 text-sm text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Geri
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-xl border px-4 py-2 text-sm text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            İleri
          </button>
        </div>
      </div>

      {/* MODAL */}
      <CustomerModal open={open} onClose={() => setOpen(false)}>
        <CustomerForm
          onSave={handleSave}
          initialData={selectedPayment}
          customers={customers}
        />
      </CustomerModal>

    </div>
  );
}