type Props = {
  details: any[];
  onEdit: (detail: any) => void;
  onDelete: (id: number) => void;
};

export default function SaleDetailTable({
  details,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="h-[400px] overflow-y-auto rounded-2xl border 
                    border-gray-200 dark:border-gray-700">

      <table className="w-full">

        <thead className="sticky top-0 z-10 
                           bg-gray-100 dark:bg-gray-800 
                           shadow-sm">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Ürün
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Adet
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Fiyat
            </th>

            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
              İşlemler
            </th>
          </tr>
        </thead>

        <tbody>
          {details.map((detail, index) => (
            <tr
              key={detail.saleDetailID}
              className={
                index % 2 === 0
                  ? "bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
                  : "bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
              }
            >
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                {detail.product?.productName}
              </td>

              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                {detail.quantity}
              </td>

              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                ₺ {detail.unitPrice}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">

                  {/* EDIT */}
                  <div className="relative group">
                    <button
                      onClick={() => onEdit(detail)}
                      className="rounded-lg bg-yellow-500 hover:bg-yellow-600 px-3 py-2 text-sm text-white transition"
                    >
                      ✏️
                    </button>

                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                                     hidden group-hover:block 
                                     rounded bg-black px-2 py-1 text-xs text-white">
                      Güncelle
                    </span>
                  </div>

                  {/* DELETE */}
                  <div className="relative group">
                    <button
                      onClick={() => onDelete(detail.saleDetailID)}
                      className="rounded-lg bg-red-500 hover:bg-red-600 px-3 py-2 text-sm text-white transition"
                    >
                      🗑
                    </button>

                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                                     hidden group-hover:block 
                                     rounded bg-black px-2 py-1 text-xs text-white">
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