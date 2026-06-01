import { useEffect, useMemo, useState } from "react";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";
import { Category } from "../types/Category";
import CategoryForm from "../components/categoryForm";
import CategoryModal from "../components/categoryModal";
import toast from "react-hot-toast";

const PAGE_SIZE = 5;

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Veriler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedCategory) {
        await updateCategory(data);
        toast.success("Kategori güncellendi");
      } else {
        await createCategory(data);
        toast.success("Kategori eklendi");
      }

      setOpen(false);
      setSelectedCategory(null);
      loadCategories();
    } catch {
      toast.error("İşlem başarısız");
    }
  };

  const filtered = useMemo(() => {
    return categories.filter((c) =>
      c.categoryName.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-auto rounded-2xl bg-white dark:bg-gray-900 p-6">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Kategori Yönetimi
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Kategorileri ekle, güncelle ve yönet.
          </p>
        </div>
      </div>

      {/* SEARCH + BUTTON */}
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Kategori ara..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-3 pl-11 text-sm text-gray-800 dark:text-white outline-none focus:border-blue-500 dark:focus:bg-gray-800"
          />
          <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
        </div>

        <button
          className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
          onClick={() => {
            setOpen(true);
            setSelectedCategory(null);
          }}
        >
          + Kategori Ekle
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">

        <div className="overflow-x-auto">
          <table className="w-full">

            {/* HEADER */}
            <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-bold w-12 text-gray-800 dark:text-white">#</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 dark:text-white">Kategori</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-800 dark:text-white">İşlemler</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-gray-400">
                    Yükleniyor...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-gray-400">
                    Kategori bulunamadı
                  </td>
                </tr>
              ) : (
                paginated.map((c, index) => {
                  const rowNumber = (page - 1) * PAGE_SIZE + index + 1;

                  return (
                    <tr
                      key={c.categoryID}
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <td className="px-4 py-4 text-gray-500 dark:text-gray-400 font-medium">
                        {rowNumber}
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                        {c.categoryName}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">

                          <button
                            onClick={() => {
                              setSelectedCategory(c);
                              setOpen(true);
                            }}
                            className="rounded-xl bg-amber-100 dark:bg-amber-500/20 px-3 py-2 text-amber-600"
                          >
                            ✏️
                          </button>

                          <button
                            onClick={async () => {
                              if (window.confirm("Silinsin mi?")) {
                                await deleteCategory(c.categoryID);
                                loadCategories();
                                toast.success("Silindi");
                              }
                            }}
                            className="rounded-xl bg-rose-100 dark:bg-rose-500/20 px-3 py-2 text-rose-600"
                          >
                            🗑
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 border-t bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 px-6 py-4 md:flex-row md:items-center md:justify-between">

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Sayfa {page} / {totalPages || 1}
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Toplam{" "}
            <span className="font-semibold text-gray-800 dark:text-white">
              {filtered.length}
            </span>{" "}
            kayıt
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
      <CategoryModal open={open} onClose={() => setOpen(false)}>
        <CategoryForm onSave={handleSave} initialData={selectedCategory} />
      </CategoryModal>

    </div>
  );
}