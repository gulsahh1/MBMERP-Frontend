type Props = {
  details: any[];
  onEdit: (detail: any) => void;
  onDelete: (id: number) => void;
};

export default function StockTransactionTable({
  details,
  onEdit,
  onDelete,
}: Props) {
  const transactionLabels: any = {
    1: "Satın Alma",
    2: "Satış",
    3: "Stok Düzeltme",
  };

  const transactionColors: any = {
    1: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    2: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    3: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  };

  return (
    <div className="h-[400px] overflow-y-auto rounded-2xl 
                    border border-gray-200 dark:border-gray-700">

      <table className="w-full">

        <thead className="sticky top-0 z-10 
                           bg-gray-100 dark:bg-gray-800 
                           shadow-sm">

          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Ürün
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Miktar
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              İşlem Türü
            </th>

            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
              İşlemler
            </th>
          </tr>

        </thead>

        <tbody>
          {details.map((detail, index) => (
            <tr
              key={detail.stockTransactionID}
              className={
                index % 2 === 0
                  ? "border-t bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  : "border-t bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              }
            >

              {/* PRODUCT */}
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                {detail.product?.productName}
              </td>

              {/* QUANTITY */}
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                {detail.quantity}
              </td>

              {/* TYPE BADGE */}
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${transactionColors[detail.transactionType]}`}
                >
                  {transactionLabels[detail.transactionType]}
                </span>
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onEdit(detail)}
                    className="rounded-lg bg-amber-100 dark:bg-amber-500/20 px-3 py-2 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-500/30"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => onDelete(detail.stockTransactionID)}
                    className="rounded-lg  bg-rose-100 dark:bg-rose-500/20 px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-500/30"
                  >
                    🗑
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}