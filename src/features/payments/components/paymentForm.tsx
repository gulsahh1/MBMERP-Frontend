import { useState, useEffect } from "react";
import { paymentTypeOptions } from "../../../Enums/paymentType";

type Props = {
  onSave: (data: any) => void;
  initialData: any;
  customers: any[];
};

export default function PaymentForm({
  onSave,
  initialData,
  customers,
}: Props) {
  const [formData, setFormData] = useState(
    initialData || {
      paymentID: 0,
      customerID: "",
      amount: "",
      date: "",
      paymentType: "",
    }
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "amount" ||
        name === "customerID" ||
        name === "paymentType"
          ? Number(value)
          : value,
    });
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        paymentID: initialData.paymentID || 0,
        customerID: initialData.customerID || 0,
        amount: initialData.amount || 0,
        date: initialData.date || "",
        paymentType: initialData.paymentType || "",
      });
    } else {
      setFormData({
        paymentID: 0,
        customerID: 0,
        amount: 0,
        date: "",
        paymentType: "",
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
          name="amount"
          placeholder="Tutar"
          onChange={handleChange}
          className={inputClass}
          value={formData.amount}
        />
      </div>

      {/* Date */}
      <div>
        <label className={labelClass}>Tarih</label>
        <input
          type="date"
          name="date"
          onChange={handleChange}
          className={inputClass}
          value={formData.date}
        />
      </div>

      {/* Payment Type */}
      <div>
        <label className={labelClass}>Ödeme Tipi</label>
        <select
          name="paymentType"
          value={formData.paymentType}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="" disabled>
            Seçiniz
          </option>

          {paymentTypeOptions.map((type) => (
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