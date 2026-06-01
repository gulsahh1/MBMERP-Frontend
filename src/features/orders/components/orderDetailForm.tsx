import { useEffect } from "react";

type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  products: any[];
  onSave: () => void;
};

export default function OrderDetailForm({
  formData,
  setFormData,
  products,
  onSave,
}: Props) {
  // PRODUCT SEÇİLİNCE
  useEffect(() => {
    const selectedProduct = products.find(
      (x) => x.productID === Number(formData.productID)
    );

    if (selectedProduct) {
      const total = formData.quantity * selectedProduct.price;

      setFormData((prev: any) => ({
        ...prev,
        unitPrice: selectedProduct.price,
        totalPrice: total,
      }));
    }
  }, [formData.productID, formData.quantity]);

  const inputClass =
    "w-full rounded-xl border p-3 text-sm " +
    "bg-white dark:bg-gray-900 " +
    "text-gray-900 dark:text-gray-100 " +
    "border-gray-300 dark:border-gray-700 " +
    "outline-none focus:border-blue-500 dark:focus:border-blue-400";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300";

  const disabledInputClass =
    "w-full rounded-xl border p-3 text-sm " +
    "bg-gray-100 dark:bg-gray-800 " +
    "text-gray-600 dark:text-gray-300 " +
    "border-gray-200 dark:border-gray-700";

  const buttonClass =
    "rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 " +
    "px-6 py-3 text-sm font-semibold text-white transition";

  return (
    <div className="space-y-5">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

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
            <option value={0}>Ürün Seçiniz</option>

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
            disabled
            className={disabledInputClass}
          />
        </div>

        {/* TOTAL PRICE */}
        <div>
          <label className={labelClass}>Toplam Tutar</label>

          <input
            type="number"
            value={formData.totalPrice}
            disabled
            className={disabledInputClass}
          />
        </div>

      </div>

      {/* DESCRIPTION */}
      <div>
        <label className={labelClass}>Açıklama</label>

        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          rows={3}
          className={inputClass}
        />
      </div>

      {/* BUTTON */}
      <div className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-4">

        <button onClick={onSave} className={buttonClass}>
          {formData.orderDetailID > 0 ? "Güncelle" : "Kaydet"}
        </button>

      </div>

    </div>
  );
}