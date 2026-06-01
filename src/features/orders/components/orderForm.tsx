import { useState, useEffect } from "react";
import { OrderStatusOptions } from "../../../Enums/orderStatus";

type Props = {
  onSave: (data: any) => void;
  initialData: any;
  customers: any[];
};

export default function OrderForm({
  onSave,
  initialData,
  customers,
}: Props) {
  const [formData, setFormData] = useState(
    initialData || {
      orderID: 0,
      customerID: "",
      totalAmount: "",
      orderDate: "",
      orderStatus: "",
    }
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "totalAmount" ||
        name === "customerID" ||
        name === "orderStatus"
          ? Number(value)
          : value,
    });
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        orderID: initialData.orderID || 0,
        customerID: initialData.customerID || 0,
        totalAmount: initialData.totalAmount || 0,
        orderDate: initialData.orderDate || "",
        orderStatus: initialData.orderStatus || "",
      });
    } else {
      setFormData({
        orderID: 0,
        customerID: 0,
        totalAmount: 0,
        orderDate: "",
        orderStatus: "",
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

      {/* Customer */}
      <div className="mt-5">
        <label className={labelClass}>Müşteri</label>
        <select
          name="customerID"
          value={formData.customerID}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Seçiniz</option>
          {customers.map((c) => (
            <option key={c.customerID} value={c.customerID}>
              {c.customerName}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className={labelClass}>Tutar</label>
        <input
          type="number"
          name="totalAmount"
          placeholder="Tutar"
          onChange={handleChange}
          className={inputClass}
          value={formData.totalAmount}
        />
      </div>

      {/* Date */}
      <div>
        <label className={labelClass}>Tarih</label>
        <input
          type="date"
          name="orderDate"
          onChange={handleChange}
          className={inputClass}
          value={formData.orderDate}
        />
      </div>

      {/* Status */}
      <div>
        <label className={labelClass}>Sipariş Durumu</label>
        <select
          name="orderStatus"
          value={formData.orderStatus}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="" disabled>
            Seçiniz
          </option>

          {OrderStatusOptions.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <button onClick={() => onSave(formData)} className={buttonClass}>
        Kaydet
      </button>

    </div>
  );
}