import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  deleteOrderDetail,
  getOrderDetails,
} from "../services/orderDetailService";
import { getProducts } from "../../products/services/productService";

export default function OrderDetailInline({
  orderID,
  onAdd,
  onEdit,
  refresh,
}: any) {
  const [details, setDetails] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    load();
    loadProduct();
  }, [orderID, refresh]);

  const load = async () => {
    const data = await getOrderDetails(orderID);
    setDetails(data);
  };

  const loadProduct = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const productMap = Object.fromEntries(
    products.map((c) => [c.productID, c.productName])
  );

  return (
    <div className="mt-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3 text-sm">

      {/* HEADER */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Sipariş Detayları
        </h3>

        <button
          onClick={onAdd}
          className="rounded-lg bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
        >
          + Detay Ekle
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full overflow-hidden rounded-xl text-xs">

        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          <tr>
            <th className="px-3 py-2 text-left font-medium">Ürün</th>
            <th className="px-3 py-2 text-left font-medium">Adet</th>
            <th className="px-3 py-2 text-left font-medium">Birim Fiyat</th>
            <th className="px-3 py-2 text-left font-medium">Toplam</th>
            <th className="px-3 py-2 text-center font-medium">İşlem</th>
          </tr>
        </thead>

        <tbody>
          {details.map((detail: any) => (
            <tr
              key={detail.orderDetailID}
              className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/60"
            >
              <td className="px-3 py-2 text-gray-800 dark:text-gray-200">
                {productMap[detail.productID]}
              </td>

              <td className="px-3 py-2 text-gray-800 dark:text-gray-200">
                {detail.quantity}
              </td>

              <td className="px-3 py-2 text-gray-800 dark:text-gray-200">
                ₺ {detail.unitPrice}
              </td>

              <td className="px-3 py-2 text-gray-800 dark:text-gray-200">
                ₺ {detail.totalPrice}
              </td>

              <td className="px-3 py-2">
                <div className="flex justify-center gap-1">

                  <div className="relative group">
                    <button
                      onClick={() => {
                        onEdit(detail);
                        load();
                      }}
                      className="rounded-md  bg-amber-100 px-2 py-1 text-xs text-white  dark:bg-amber-500/20  hover:text-amber-600 "
                    >
                      ✏️
                    </button>

                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block rounded bg-black px-2 py-1 text-xs text-white">
                      Güncelle
                    </span>
                  </div>

                  <div className="relative group">
                    <button
                      onClick={async () => {
                        if (window.confirm("Silmek istiyor musunuz?")) {
                          await deleteOrderDetail(detail.orderDetailID);
                          load();
                        }
                      }}
                      className="rounded-md bg-rose-100 px-2 py-1 text-xs  dark:bg-rose-500/20  text-white hover:bg-rose-200"
                    >
                      🗑
                    </button>

                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block rounded bg-black px-2 py-1 text-xs text-white">
                      Sil
                    </span>
                  </div>

                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}