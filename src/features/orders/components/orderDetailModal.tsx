import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createOrderDetail,
  updateOrderDetail,
} from "../services/orderDetailService";

import { getProducts } from "../../products/services/productService";

import OrderDetailForm from "./orderDetailForm";

export default function OrderDetailModal({
  open,
  onClose,
  orderID,
  selectedDetail,
  onSaved,
}: any) {
  const [products, setProducts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    orderDetailID: 0,
    orderID: 0,
    productID: 0,
    quantity: 1,
    unitPrice: 0,
    totalPrice: 0,
    description: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedDetail) {
      setFormData({
        ...selectedDetail,
      });
    } else {
      setFormData({
        orderDetailID: 0,
        orderID: orderID,
        productID: 0,
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        description: "",
      });
    }
  }, [selectedDetail, orderID]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        orderID: orderID,
        totalPrice: formData.quantity * formData.unitPrice,
      };

      if (formData.orderDetailID > 0) {
        await updateOrderDetail(payload);
        toast.success("Detay güncellendi");
      } else {
        await createOrderDetail(payload);
        toast.success("Detay eklendi");
      }

      onSaved();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center 
                    bg-black/30 dark:bg-black/60 
                    backdrop-blur-sm pt-8">

      <div className="w-full max-w-2xl rounded-3xl 
                      bg-white dark:bg-gray-900 
                      text-gray-900 dark:text-gray-100
                      border border-gray-200 dark:border-gray-700
                      shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-black/50
                      p-6">

        {/* HEADER */}
        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {formData.orderDetailID > 0
                ? "Sipariş Detay Güncelle"
                : "Yeni Sipariş Detayı"}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sipariş detay bilgilerini düzenleyebilirsiniz.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-black dark:hover:text-white transition"
          >
            ✕
          </button>

        </div>

        {/* FORM */}
        <OrderDetailForm
          formData={formData}
          setFormData={setFormData}
          products={products}
          onSave={handleSave}
        />

      </div>

    </div>
  );
}