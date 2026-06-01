import { apiClient } from "../../../api/apiClient";
import { OrderDetail } from "../types/OrderDetail";

export const getOrderDetails = async (orderID: number): Promise<OrderDetail[]> => {
  try {
    const response = await apiClient.get(`/OrderDetail/order/${orderID}`);
    console.log("Sipariş detayları:", response.data);

    return response.data;
  } catch (error) {
    console.error("sipaiş detayları alınırken hata oluştu:", error);

    throw error;
  }
};

export const createOrderDetail = async (data: any): Promise<void> => {
  try {
    await apiClient.post("/OrderDetail", data);
  } catch (error) {
    console.error("Sipariş detayı oluşturulurken hata oluştu:", error);

    throw error;
  }
};

export const updateOrderDetail = async ( orderDetail: OrderDetail,): Promise<void> => {
     const response = await apiClient.put(`/OrderDetail/${orderDetail.orderDetailID}`, orderDetail);
     return response.data
};


export const deleteOrderDetail = async (orderDetailID: number): Promise<void> => {
  try {
    await apiClient.delete(`/OrderDetail/${orderDetailID}`);
  } catch (error) {
    console.error("sipariş detayı silinirken hata oluştu:", error);

    throw error;
  }
};