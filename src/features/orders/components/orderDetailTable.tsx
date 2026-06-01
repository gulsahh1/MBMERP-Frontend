type Props = {
  details: any[];
  onEdit: (detail: any) => void;
  onDelete: (id: number) => void;
};

export default function OrderDetailTable({ details, onEdit, onDelete }: Props) {
  return (
    <div className="h-[400px] overflow-y-auto rounded-2xl border border-gray-200">
      <table className="w-full">
        <thead className="sticky top-0 z-10 bg-gray-100 shadow-sm">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Ürün</th>

            <th className="px-4 py-3 text-left text-sm font-semibold">Adet</th>

            <th className="px-4 py-3 text-left text-sm font-semibold">Fiyat</th>
            
            <th className="px-4 py-3 text-left text-sm font-semibold">Toplam Tutar</th>


            <th className="px-4 py-3 text-center text-sm font-semibold">
              İşlemler
            </th>
          </tr>
        </thead>

        <tbody>
          {details.map((detail, index) => (
            <tr
              key={detail.orderDetailID}
              className={
                index % 2 === 0 ? "bg-white border-t" : "bg-gray-50 border-t"
              }
            >
              <td className="px-4 py-3">{detail.product?.productName}</td>

              <td className="px-4 py-3">{detail.quantity}</td>

              <td className="px-4 py-3">₺ {detail.unitPrice}</td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <div className="relative group">
                    <button
                      onClick={() => onEdit(detail)}
                      className="rounded-lg bg-yellow-500 px-3 py-2 text-sm text-white"
                    >
                      ✏️
                    </button>

                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block rounded bg-black px-2 py-1 text-xs text-white">
                      Güncelle
                    </span>
                  </div>

                  <div className="relative group">
                    <button
                      onClick={() => onDelete(detail.orderDetailID)}
                      className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
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
