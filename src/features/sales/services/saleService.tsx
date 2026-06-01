import { apiClient } from "../../../api/apiClient";
import { Sale } from "../types/sale";

 export const getSales = async(): Promise<Sale[]>=>{
    const response  = await apiClient.get("/Sale");
    return response.data;
}

export const createSale = async (sale:Omit<Sale,"saleID">):Promise<Sale> =>{
    const response = await apiClient.post("/Sale",sale);
    return response.data;
}

export const updateSale = async (sale:Sale):Promise<Sale> =>{
    const response = await apiClient.put(`/Sale/${sale.saleID}`,sale);
    return response.data;
}

export const deleteSale = async (saleID:number):Promise<void> =>{
    await apiClient.delete(`/Sale/${saleID}`);
}