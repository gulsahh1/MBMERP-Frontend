import { useState, useEffect } from "react";

type Props = {
  onSave: (data: any) => void;
  initialData: any;
  categories: any[];
};

export default function ProductForm({
  onSave,
  initialData,
  categories,
}: Props) {
  const [formData, setFormData] = useState(
    initialData || {
      productID: 0,
      productName: "",
      price: 0,
      costPrice: 0,
      description: "",
      categoryID: 0,
      unit: "",
    }
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "price" ||
        name === "costPrice" ||
        name === "categoryID"
          ? Number(value)
          : value,
    });
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        productID: initialData.productID || 0,
        productName: initialData.productName || "",
        price: initialData.price || 0,
        costPrice: initialData.costPrice || 0,
        description: initialData.description || "",
        categoryID: initialData.categoryID || 0,
        unit: initialData.unit || "",
      });
    } else {
      setFormData({
        productID: 0,
        productName: "",
        price: 0,
        costPrice: 0,
        description: "",
        categoryID: 0,
        unit: "",
      });
    }
  }, [initialData]);

  const inputClass =
    "w-full rounded-xl border p-3 " +
    "bg-white dark:bg-gray-900 " +
    "text-gray-900 dark:text-gray-100 " +
    "border-gray-300 dark:border-gray-700 " +
    "placeholder-gray-400 dark:placeholder-gray-500 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400";

  const labelClass =
    "mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300";

  const buttonClass =
    "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 " +
    "text-white px-4 py-2 rounded-xl transition";

  return (
    <div className="space-y-4">
      <div className="mt-10">
        <label className={labelClass}>Ürün Adı</label>
        <input
          type="text"
          name="productName"
          placeholder="Ürün Adı"
          onChange={handleChange}
          className={inputClass}
          value={formData.productName}
        />
      </div>

      <div>
        <label className={labelClass}>Satış Fiyatı</label>
        <input
          type="number"
          name="price"
          onChange={handleChange}
          className={inputClass}
          value={formData.price}
        />
      </div>

      <div>
        <label className={labelClass}>Maliyet Fiyatı</label>
        <input
          type="number"
          name="costPrice"
          onChange={handleChange}
          className={inputClass}
          value={formData.costPrice}
        />
      </div>

      <div>
        <label className={labelClass}>Açıklama</label>
        <input
          type="text"
          name="description"
          placeholder="Açıklama"
          onChange={handleChange}
          className={inputClass}
          value={formData.description}
        />
      </div>

      <div>
        <label className={labelClass}>Kategori</label>
        <select
          name="categoryID"
          value={formData.categoryID}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Seçiniz</option>
          {categories.map((c) => (
            <option key={c.categoryID} value={c.categoryID}>
              {c.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Birim</label>
        <input
          type="text"
          name="unit"
          placeholder="Birim"
          onChange={handleChange}
          className={inputClass}
          value={formData.unit}
        />
      </div>

      <button onClick={() => onSave(formData)} className={buttonClass}>
        Kaydet
      </button>
    </div>
  );
}