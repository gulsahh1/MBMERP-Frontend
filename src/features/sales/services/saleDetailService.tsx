import { apiClient } from "../../../api/apiClient";
import { SaleDetail } from "../types/saleDetail";

export const getSaleDetails = async (saleID: number): Promise<SaleDetail[]> => {
  try {
    const response = await apiClient.get(`/SaleDetail/sale/${saleID}`);

    return response.data;
  } catch (error) {
    console.error("Satış detayları alınırken hata oluştu:", error);

    throw error;
  }
};

export const createSaleDetail = async (data: any): Promise<void> => {
  try {
    await apiClient.post("/SaleDetail", data);
  } catch (error) {
    console.error("Satış detayı oluşturulurken hata oluştu:", error);

    throw error;
  }
};

export const updateSaleDetail = async (
  saleDetail: SaleDetail,
): Promise<void> => {
  await apiClient.put(`/SaleDetail/${saleDetail.saleDetailID}`, saleDetail);
};

export const deleteSaleDetail = async (saleDetailID: number): Promise<void> => {
  try {
    await apiClient.delete(`/SaleDetail/${saleDetailID}`);
  } catch (error) {
    console.error("Satış detayı silinirken hata oluştu:", error);

    throw error;
  }
};
