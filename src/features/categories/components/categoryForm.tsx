import { useState, useEffect } from "react";

type Props = {
  onSave: (data: any) => void;
  initialData: any;
};

export default function CategoryForm({ onSave, initialData }: Props) {
  const [formData, setFormData] = useState(
    initialData || {
      categoryID: 0,
      categoryName: "",
    }
  );

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        categoryID: initialData.categoryID || 0,
        categoryName: initialData.categoryName || "",
      });
    } else {
      setFormData({
        categoryID: 0,
        categoryName: "",
      });
    }
  }, [initialData]);

  return (
    <div className="space-y-4 ">

      <input
        type="text"
        name="categoryName"
        placeholder="Kategori Adı"
        onChange={handleChange}
        value={formData.categoryName}
        className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-800 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
      />

      <button
        onClick={() => {
          onSave(formData);
        }}
        className="rounded-xl bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Kaydet
      </button>

    </div>
  );
}