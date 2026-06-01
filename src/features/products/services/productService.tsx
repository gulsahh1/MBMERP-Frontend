import { Product } from "../types/Product.";
import { apiClient } from "../../../api/apiClient";

export const getProducts = async(): Promise<Product[]>=>{
    const response  = await apiClient.get("/Product");
    return response.data;
}

export const createProduct = async (product:Omit<Product,"productID">):Promise<Product> =>{
    const response = await apiClient.post("/Product",product);
    return response.data;
}

export const updateProduct = async (product:Product):Promise<Product> =>{
    const response = await apiClient.put(`/Product/${product.productID}`,product);
    return response.data;
}

export const deleteProduct = async (productID:number):Promise<void> =>{
    await apiClient.delete(`/Product/${productID}`);
}