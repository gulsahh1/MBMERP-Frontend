import { apiClient } from "../../../api/apiClient";
import { Category } from "../types/Category";

export const getCategories = async() :Promise<Category[]> =>{
    const response =await apiClient.get("/Category");
    return response.data;
}

export const createCategory = async (category:Omit<Category,"categoryId">):Promise<Category> =>{
    const response = await apiClient.post("/Category",category);
    return response.data;
}

export const updateCategory = async (category:Category):Promise<Category> =>{
    const response = await apiClient.put(`/Category/${category.categoryID}`,category);
    return response.data;
}

export const deleteCategory = async (categoryID:number):Promise<void> =>{
    await apiClient.delete(`/Category/${categoryID}`);
}