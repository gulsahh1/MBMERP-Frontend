import { useEffect, useState } from "react";
import {
  getSaleDetails,
  createSaleDetail,
  updateSaleDetail,
  deleteSaleDetail,
} from "../services/saleDetailService";

import { getProducts } from "../../products/services/productService";
import toast from "react-hot-toast";

import SaleDetailForm from "./saleDetailForm";
import SaleDetailTable from "./saleDetailTable";

type Props = {
  open: boolean;
  onClose: () => void;
  saleID: number | null;
};

export default function SaleDetailModal({
  open,
  onClose,
  saleID,
}: Props) {
  const [details, setDetails] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(details.length / itemsPerPage);

  const paginatedDetails = details.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [formData, setFormData] = useState({
    saleDetailID: 0,
    saleID: 0,
    productID: 0,
    quantity: 1,
    unitPrice: 0,
  });

  useEffect(() => {
    if (open && saleID) {
      loadDetails();
      loadProducts();
      setCurrentPage(1);

      setFormData({
        saleDetailID: 0,
        saleID: saleID,
        productID: 0,
        quantity: 1,
        unitPrice: 0,
      });
    }
  }, [open, saleID]);

  const loadDetails = async () => {
    try {
      const data = await getSaleDetails(saleID!);
      setDetails(data);
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

  const handleSave = async () => {
    try {
      if (formData.saleDetailID > 0) {
        await updateSaleDetail(formData);
        toast.success("Detay güncellendi");
      } else {
        await createSaleDetail(formData);
        toast.success("Detay eklendi");
      }

      await loadDetails();

      setFormData({
        saleDetailID: 0,
        saleID: saleID || 0,
        productID: 0,
        quantity: 1,
        unitPrice: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center 
                    bg-black/40 dark:bg-black/60 
                    backdrop-blur-sm p-4">

      <div className="relative flex h-[90vh] w-full max-w-5xl flex-col 
                      rounded-3xl 
                      bg-white dark:bg-gray-900 
                      text-gray-900 dark:text-gray-100
                      border border-gray-200 dark:border-gray-700
                      shadow-2xl dark:shadow-black/50
                      p-6">

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Satış Detayları
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Satış kalemlerini yönetebilirsiniz.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 dark:text-gray-300 
                       hover:text-black dark:hover:text-white transition"
          >
            ✕
          </button>

        </div>

        {/* TABLE + PAGINATION */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* TABLE */}
          <div className="flex-1 overflow-y-auto rounded-2xl 
                          border border-gray-200 dark:border-gray-700">
            <SaleDetailTable
              details={paginatedDetails}
              onEdit={(detail) => setFormData(detail)}
              onDelete={async (id) => {
                await deleteSaleDetail(id);
                toast.success("Detay silindi");
                await loadDetails();
              }}
            />
          </div>

          {/* PAGINATION */}
          <div className="mt-4 flex items-center justify-between">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toplam {details.length} kayıt
            </p>

            <div className="flex items-center gap-2">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="rounded-lg border px-3 py-2 text-sm
                           border-gray-300 dark:border-gray-700
                           disabled:opacity-40"
              >
                Önceki
              </button>

              <div className="px-2 text-sm font-medium">
                {currentPage} / {totalPages || 1}
              </div>

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="rounded-lg border px-3 py-2 text-sm
                           border-gray-300 dark:border-gray-700
                           disabled:opacity-40"
              >
                Sonraki
              </button>

            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="mt-5 shrink-0 rounded-2xl 
                        border border-gray-200 dark:border-gray-700 
                        p-4">
          <SaleDetailForm
            formData={formData}
            setFormData={setFormData}
            products={products}
            onSave={handleSave}
          />
        </div>

      </div>
    </div>
  );
}