import { useEffect, useState } from "react";
import { Customer } from "../types/Customer";
import CustomerForm from "../components/customerForm";
import CustomerModal from "../components/customerModal";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../services/customerService";
import toast from "react-hot-toast";

export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    loadCustomers();
  }, []);

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
      if (selectedCustomer) {
        await updateCustomer(data);
        toast.success("Müşteri güncellendi");
      } else {
        await createCustomer(data);
        toast.success("Kayıt başarılı");
      }

      setOpen(false);
      setSelectedCustomer(null);
      loadCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCustomers = customers.filter((x) =>
    x.customerName.toLowerCase().includes(search.toLowerCase()) ||
    x.email.toLowerCase().includes(search.toLowerCase()) ||
    x.phone.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const customerTypeMap: any = {
    1: "Bireysel",
    2: "Kurumsal",
  };

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-auto rounded-2xl bg-white dark:bg-gray-900 p-6">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Müşteri Yönetimi
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Müşterileri arayabilir, filtreleyebilir ve yönetebilirsin.
          </p>
        </div>
      </div>

      {/* SEARCH + BUTTON */}
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Müşteri ara..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-3 pl-11 text-sm text-gray-800 dark:text-white outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-800"
          />
          <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
        </div>

        <button
          className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 dark:hover:bg-blue-500/80"
          onClick={() => {
            setOpen(true);
            setSelectedCustomer(null);
          }}
        >
          + Müşteri Ekle
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* HEADER */}
            <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">#</th>
                <th className="px-6 py-4 text-left text-m font-bold text-gray-800 dark:text-white">Müşteri</th>
                <th className="px-6 py-4 text-left text-m font-bold text-gray-800 dark:text-white">Telefon</th>
                <th className="px-6 py-4 text-left text-m font-bold text-gray-800 dark:text-white">Email</th>
                <th className="px-6 py-4 text-left text-m font-bold text-gray-800 dark:text-white">Adres</th>
                <th className="px-6 py-4 text-left text-m font-bold text-gray-800 dark:text-white">Tür</th>
                <th className="px-6 py-4 text-left text-m font-bold text-gray-800 dark:text-white">Bakiye</th>
                <th className="px-6 py-4 text-center text-m font-bold text-gray-800 dark:text-white">İşlemler</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {paginatedCustomers.map((customer, index) => {
                const rowNumber =
                  (currentPage - 1) * pageSize + index + 1;

                return (
                  <tr
                    key={customer.customerID}
                    className={`border-t transition hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-900"
                    }`}
                  >

                    <td className="px-4 py-4 text-gray-500 dark:text-gray-400 font-medium">
                      {rowNumber}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                      {customer.customerName}
                    </td>

                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {customer.phone}
                    </td>

                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {customer.email}
                    </td>

                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {customer.address}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-blue-50 dark:bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-300">
                        {customerTypeMap[customer.customerType] ?? "Bilinmiyor"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`font-semibold ${
                          customer.balance > 0
                            ? "text-red-500 dark:text-red-400"
                            : "text-green-500 dark:text-green-400"
                        }`}
                      >
                        ₺ {customer.balance}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">

                        <button
                          onClick={() => {
                            setSelectedCustomer({ ...customer });
                            setOpen(true);
                          }}
                          className="rounded-xl bg-amber-100 dark:bg-amber-500/20 px-3 py-2 text-amber-600 dark:text-amber-300"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={async () => {
                            if (window.confirm("Silinsin mi?")) {
                              await deleteCustomer(customer.customerID);
                              loadCustomers();
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

              {paginatedCustomers.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-gray-400 dark:text-gray-500">
                    Kayıt bulunamadı
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 border-t bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 px-6 py-4 md:flex-row md:items-center md:justify-between">

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Sayfa {currentPage} / {totalPages || 1}
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Toplam{" "}
            <span className="font-semibold text-gray-800 dark:text-white">
              {filteredCustomers.length}
            </span>{" "}
            kayıt
          </div>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="rounded-xl border px-4 py-2 text-sm text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Geri
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="rounded-xl border px-4 py-2 text-sm text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              İleri
            </button>
          </div>

        </div>

      </div>

      {/* MODAL */}
      <CustomerModal open={open} onClose={() => setOpen(false)}>
        <CustomerForm
          onSave={handleSave}
          initialData={selectedCustomer}
        />
      </CustomerModal>

    </div>
  );
}