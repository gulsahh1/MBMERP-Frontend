import { useState, useEffect } from "react";

type Props = {
  onSave: (data: any) => void;
  initialData: any;
  products: any[];
};

export default function StockForm({
  onSave,
  initialData,
  products,
}: Props) {
  const [formData, setFormData] = useState(
    initialData || {
      stockID: 0,
      productID: 0,
      quantity: 0,
    }
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "productID" || name === "quantity"
          ? Number(value)
          : value,
    });
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        stockID: initialData.stockID || 0,
        productID: initialData.productID || 0,
        quantity: initialData.quantity || 0,
      });
    } else {
      setFormData({
        stockID: 0,
        productID: 0,
        quantity: 0,
      });
    }
  }, [initialData]);

  const containerClass =
    "space-y-4";

  const labelClass =
    "mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300";

  const inputClass =
    "w-full rounded-xl border p-3 " +
    "bg-white dark:bg-gray-900 " +
    "text-gray-900 dark:text-gray-100 " +
    "border-gray-300 dark:border-gray-700 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400";

  const buttonClass =
    "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 " +
    "text-white px-4 py-2 rounded-xl transition";

  return (
    <div className={containerClass}>

      {/* PRODUCT */}
      <div>
        <label className={labelClass}>Ürün</label>

        <select
          name="productID"
          value={formData.productID}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Seçiniz</option>

          {products.map((c) => (
            <option key={c.productID} value={c.productID}>
              {c.productName}
            </option>
          ))}
        </select>
      </div>

      {/* QUANTITY */}
      <div>
        <input
          type="text"
          name="quantity"
          placeholder="Miktar"
          onChange={handleChange}
          className={inputClass}
          value={formData.quantity}
        />
      </div>

      {/* BUTTON */}
      <button onClick={() => onSave(formData)} className={buttonClass}>
        Kaydet
      </button>

    </div>
  );
}