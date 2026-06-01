import { useEffect, useMemo, useState } from "react";
import { Product } from "../types/Product.";
import ProductForm from "../components/productForm";
import ProductModal from "../components/productModal";
import toast from "react-hot-toast";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService";

import { getCategories } from "../../categories/services/categoryService";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedProduct) {
        await updateProduct(data);
        toast.success("Ürün güncellendi");
      } else {
        await createProduct(data);
        toast.success("Ürün eklendi");
      }

      setOpen(false);
      setSelectedProduct(null);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const categoryMap = Object.fromEntries(
    categories.map((c) => [c.categoryID, c.categoryName])
  );

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.productName.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, page]);

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-auto rounded-2xl bg-white dark:bg-gray-900 p-6">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Ürün Yönetimi
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Ürünleri ekleyebilir, güncelleyebilir ve silebilirsin.
          </p>
        </div>
      </div>

      {/* SEARCH + BUTTON */}
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Ürün ara..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-3 pl-11 text-sm text-gray-800 dark:text-white outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-800"
          />
          <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
        </div>

        <button
          className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 dark:hover:bg-blue-500/80"
          onClick={() => {
            setOpen(true);
            setSelectedProduct(null);
          }}
        >
          + Ürün Ekle
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">

        <div className="overflow-x-auto">
          <table className="w-full">

            {/* HEADER */}
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">#</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Ürün</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Fiyat</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Maliyet</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Birim</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Açıklama</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-800 dark:text-white">İşlemler</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {paginatedProducts.map((p, index) => {
                const rowNumber = (page - 1) * pageSize + index + 1;

                return (
                  <tr
                    key={p.productID}
                    className={`border-t transition hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-900"
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {rowNumber}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                      {p.productName}
                    </td>

                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{p.price}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{p.costPrice}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{p.unit}</td>

                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {categoryMap[p.categoryID] || "Bilinmiyor"}
                    </td>

                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {p.description}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">

                        <button
                          onClick={() => {
                            setSelectedProduct({ ...p });
                            setOpen(true);
                          }}
                          className="rounded-xl bg-amber-100 dark:bg-amber-500/20 px-3 py-2 text-amber-600 dark:text-amber-300"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={async () => {
                            if (window.confirm("Silinsin mi?")) {
                              await deleteProduct(p.productID);
                              loadProducts();
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

              {paginatedProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-gray-400 dark:text-gray-500">
                    Ürün bulunamadı
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 border-t bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 px-6 py-4 md:flex-row md:items-center md:justify-between">

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Toplam{" "}
            <span className="font-semibold text-gray-800 dark:text-white">
              {filteredProducts.length}
            </span>{" "}
            ürün
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

      </div>

      {/* MODAL */}
      <ProductModal open={open} onClose={() => setOpen(false)}>
        <ProductForm
          onSave={handleSave}
          initialData={selectedProduct}
          categories={categories}
        />
      </ProductModal>

    </div>
  );
}