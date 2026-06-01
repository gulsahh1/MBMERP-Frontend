import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { Stock } from "../types/Stock";
import {
  createStock,
  deleteStock,
  getStocks,
  updateStock,
} from "../services/stockService";

import StockForm from "../components/stockForm";
import StockModal from "../components/stockModal";
import { getProducts } from "../../products/services/productService";
import StockTransactionModal from "../components/stockTransactionModal";

export default function StockPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    loadStocks();
    loadProducts();
  }, []);

  const loadStocks = async () => {
    try {
      const data = await getStocks();
      setStocks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedStock) {
        await updateStock(data);
        toast.success("Stok güncellendi");
      } else {
        await createStock(data);
        toast.success("Kayıt başarılı");
      }

      setOpen(false);
      setSelectedStock(null);
      loadStocks();
    } catch (error) {
      console.error(error);
    }
  };

  const stockMap = Object.fromEntries(
    products.map((p) => [p.productID, p.productName])
  );

  const filteredStocks = useMemo(() => {
    return stocks.filter((s) =>
      (stockMap[s.productID] || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [stocks, search, products]);

  const totalPages = Math.ceil(filteredStocks.length / pageSize);

  const paginatedStocks = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredStocks.slice(start, start + pageSize);
  }, [filteredStocks, page]);

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-auto rounded-2xl bg-white dark:bg-gray-900 p-6">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Stok Yönetimi
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Stokları görüntüle, yönet ve güncelle.
          </p>
        </div>
      </div>

      {/* SEARCH + BUTTON */}
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Stok ara..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-3 pl-11 text-sm text-gray-800 dark:text-white outline-none focus:border-blue-500 dark:focus:border-blue-500"
          />
          <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
        </div>

        <button
          className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
          onClick={() => {
            setOpen(true);
            setSelectedStock(null);
          }}
        >
          + Stok Ekle
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">#</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Ürün</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Miktar</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-800 dark:text-white">İşlemler</th>
              </tr>
            </thead>

            <tbody>
              {paginatedStocks.map((s, index) => {
                const rowNumber = (page - 1) * pageSize + index + 1;

                return (
                  <tr
                    key={s.stockID}
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
                      {stockMap[s.productID] || "Bilinmiyor"}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                      {s.quantity}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">

                        <button
                          onClick={() => {
                            setSelectedStock(s);
                            setTransactionOpen(true);
                          }}
                          className="rounded-xl bg-blue-100 dark:bg-blue-500/20 px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/30"
                        >
                          👁
                        </button>

                        <button
                          onClick={() => {
                            setSelectedStock({ ...s });
                            setOpen(true);
                          }}
                          className="rounded-xl bg-amber-100 dark:bg-amber-500/20 px-3 py-2 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-500/30"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={async () => {
                            if (confirm("Silinsin mi?")) {
                              await deleteStock(s.stockID);
                              loadStocks();
                            }
                          }}
                          className="rounded-xl bg-rose-100 dark:bg-rose-500/20 px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-500/30"
                        >
                          🗑
                        </button>

                      </div>
                    </td>
                  </tr>
                );
              })}

              {paginatedStocks.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-400 dark:text-gray-500">
                    Kayıt bulunamadı
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-6 py-4 md:flex-row md:items-center md:justify-between">

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Toplam{" "}
            <span className="font-semibold text-gray-800 dark:text-white">
              {filteredStocks.length}
            </span>{" "}
            stok
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Sayfa {page} / {totalPages || 1}
          </div>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Geri
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              İleri
            </button>
          </div>

        </div>
      </div>

      {/* MODALS */}
      <StockModal open={open} onClose={() => setOpen(false)}>
        <StockForm
          onSave={handleSave}
          initialData={selectedStock}
          products={products}
        />
      </StockModal>

      <StockTransactionModal
        open={transactionOpen}
        onClose={() => setTransactionOpen(false)}
        productID={selectedStock?.productID || null}
      />

    </div>
  );
}