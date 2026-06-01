import { useState, useEffect } from "react";
import { customerTypeOptions } from "../../../Enums/customerType";

type Props = {
  onSave: (data: any) => void;
  initialData: any;
};

export default function CustomerForm({ onSave, initialData }: Props) {
  const [formData, setFormData] = useState(
    initialData || {
      customerID: 0,
      customerName: "",
      email: "",
      phone: "",
      address: "",
      balance: 0,
      customerType: "",
    }
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "balance"
          ? Number(value)
          : name === "customerType"
          ? Number(value)
          : value,
    });
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        customerID: initialData.customerID || 0,
        customerName: initialData.customerName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        balance: initialData.balance || 0,
        customerType: initialData.customerType || "",
      });
    } else {
      setFormData({
        customerID: 0,
        customerName: "",
        email: "",
        phone: "",
        address: "",
        balance: 0,
        customerType: "",
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

  return (
    <div className="space-y-4">
      <div className="mt-10">
        <label className={labelClass}>Müşteri Adı</label>
        <input
          type="text"
          name="customerName"
          placeholder="Müşteri Adı"
          onChange={handleChange}
          className={inputClass}
          value={formData.customerName}
        />
      </div>

      <div>
        <label className={labelClass}>Telefon</label>
        <input
          type="tel"
          name="phone"
          placeholder="Telefon"
          onChange={handleChange}
          className={inputClass}
          value={formData.phone}
        />
      </div>

      <div>
        <label className={labelClass}>E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          className={inputClass}
          value={formData.email}
        />
      </div>

      <div>
        <label className={labelClass}>Adres</label>
        <input
          type="text"
          name="address"
          placeholder="Adres"
          onChange={handleChange}
          className={inputClass}
          value={formData.address}
        />
      </div>

      <div>
        <label className={labelClass}>Müşteri Tipi</label>
        <select
          name="customerType"
          value={formData.customerType}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="" disabled>
            Seçiniz
          </option>

          {customerTypeOptions.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Borç Durumu</label>
        <input
          type="number"
          name="balance"
          placeholder="Borç Durumu"
          onChange={handleChange}
          className={inputClass}
          value={formData.balance}
        />
      </div>

      <button
        onClick={() => onSave(formData)}
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
      >
        Kaydet
      </button>
    </div>
  );
}