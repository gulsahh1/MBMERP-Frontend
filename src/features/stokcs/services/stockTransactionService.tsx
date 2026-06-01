import { apiClient } from "../../../api/apiClient";
import { StockTransaction } from "../types/StockTransaction";

export const getStockTransactions = async (
  productID: number,
): Promise<StockTransaction[]> => {
  try {
    const response = await apiClient.get(
      `/StockTransaction/product/${productID}`,
    );
    return response.data;
  } catch (error) {
    console.error("Stok işlemleri alınırken hata oluştu:", error);
    throw error;
  }
};

export const createStockTransaction = async (
  data: any,
): Promise<void> => {   
    try {
        await apiClient.post("/StockTransaction", data);

    } catch (error) {
        console.error("Stok işlemi oluşturulurken hata oluştu:", error);
        throw error;
    }
};

export const updateStockTransaction = async (
  stockTransaction: StockTransaction,
): Promise<void> => {
  await apiClient.put(
    `/StockTransaction/${stockTransaction.stockTransactionID}`,
    stockTransaction,
  );
};

export const deleteStockTransaction = async (
    stockTransactionID: number,
): Promise<void> => {
    try {
        await apiClient.delete(`/StockTransaction/${stockTransactionID}`);
    } catch (error) {
        console.error("Stok işlemi silinirken hata oluştu:", error);
        throw error;
    }   
};
