type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  products: any[];
  onSave: () => void;
};

export default function SaleDetailForm({
  formData,
  setFormData,
  products,
  onSave,
}: Props) {
  const containerClass =
    "rounded-2xl border p-4 " +
    "bg-gray-50 dark:bg-gray-900 " +
    "border-gray-200 dark:border-gray-700";

  const labelClass =
    "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300";

  const inputClass =
    "w-full rounded-xl border p-2.5 text-sm " +
    "bg-white dark:bg-gray-900 " +
    "text-gray-900 dark:text-gray-100 " +
    "border-gray-300 dark:border-gray-700 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400";

  const buttonClass =
    "rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 " +
    "px-4 py-2 text-sm font-medium text-white transition";

  return (
    <div className={containerClass}>

      <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-gray-100">
        {formData.saleDetailID > 0
          ? "Detay Güncelle"
          : "Yeni Detay Ekle"}
      </h3>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

        {/* PRODUCT */}
        <div>
          <label className={labelClass}>Ürün</label>

          <select
            value={formData.productID}
            onChange={(e) =>
              setFormData({
                ...formData,
                productID: Number(e.target.value),
              })
            }
            className={inputClass}
          >
            <option value="">Ürün Seçiniz</option>

            {products.map((product) => (
              <option key={product.productID} value={product.productID}>
                {product.productName}
              </option>
            ))}
          </select>
        </div>

        {/* QUANTITY */}
        <div>
          <label className={labelClass}>Adet</label>

          <input
            type="number"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: Number(e.target.value),
              })
            }
            className={inputClass}
          />
        </div>

        {/* UNIT PRICE */}
        <div>
          <label className={labelClass}>Birim Fiyat</label>

          <input
            type="number"
            value={formData.unitPrice}
            onChange={(e) =>
              setFormData({
                ...formData,
                unitPrice: Number(e.target.value),
              })
            }
            className={inputClass}
          />
        </div>

      </div>

      {/* BUTTON */}
      <div className="mt-4 flex justify-end">

        <button onClick={onSave} className={buttonClass}>
          {formData.saleDetailID > 0 ? "Güncelle" : "Kaydet"}
        </button>

      </div>

    </div>
  );
}