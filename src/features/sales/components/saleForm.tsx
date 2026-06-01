import { useState, useEffect } from "react";

type Props = {
  onSave: (data: any) => void;
  initialData: any;
  customers: any[];
};

export default function ProductForm({
  onSave,
  initialData,
  customers,
}: Props) {
  const [formData, setFormData] = useState(
    initialData || {
      saleID: 0,
      customerID: 0,
      totalAmount: 0,
    }
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "totalAmount" ? Number(value) : value,
    });
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        saleID: initialData.saleID || 0,
        customerID: initialData.customerID || 0,
        totalAmount: initialData.totalAmount || 0,
      });
    } else {
      setFormData({
        saleID: 0,
        customerID: 0,
        totalAmount: 0,
      });
    }
  }, [initialData]);

  const inputClass =
    "w-full rounded-xl border p-3 " +
    "bg-white dark:bg-gray-900 " +
    "text-gray-900 dark:text-gray-100 " +
    "border-gray-300 dark:border-gray-700 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400";

  const labelClass =
    "mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300";

  const buttonClass =
    "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 " +
    "text-white px-4 py-2 rounded-xl transition";

  return (
    <div className="space-y-4">

      {/* Customer */}
      <div>
        <label className={labelClass}>Müşteri</label>

        <select
          name="customerID"
          value={formData.customerID}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Seçiniz</option>

          {customers.map((customer) => (
            <option key={customer.customerID} value={customer.customerID}>
              {customer.customerName}
            </option>
          ))}
        </select>
      </div>

      {/* Total Amount */}
      <div>
        <label className={labelClass}>Toplam Tutar</label>

        <input
          type="number"
          name="totalAmount"
          onChange={handleChange}
          className={inputClass}
          value={formData.totalAmount}
        />
      </div>

      {/* Button */}
      <button onClick={() => onSave(formData)} className={buttonClass}>
        Kaydet
      </button>

    </div>
  );
}