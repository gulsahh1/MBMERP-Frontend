import { apiClient } from "../../../api/apiClient";
import { Stock } from "../types/Stock";


export const getStocks = async(): Promise<Stock[]> =>{
    const response = await apiClient.get("/Stock");
    return response.data;
}

export const createStock = async (stock:Omit<Stock,"stockID">):Promise<Stock> =>{
    const response = await apiClient.post("/Stock",stock);
    return response.data;
}

export const updateStock = async (stock:Stock):Promise<Stock> =>{
    const response = await apiClient.put(`/Stock/${stock.stockID}`,stock);
    return response.data;
}

export const deleteStock = async (stockID:number):Promise<void> =>{
    await apiClient.delete(`/Stock/${stockID}`);
}