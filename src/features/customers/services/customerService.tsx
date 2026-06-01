import { apiClient } from "../../../api/apiClient";
import { Customer } from "../types/Customer";

export const getCustomers = async(): Promise<Customer[]>=>{
    const response  = await apiClient.get("/Customer");
    return response.data;
}

export const createCustomer = async (customer:Omit<Customer,"customerID">):Promise<Customer> =>{
    const response = await apiClient.post("/Customer",customer);
    return response.data;
}

export const updateCustomer = async (customer:Customer):Promise<Customer> =>{
    const response = await apiClient.put(`/Customer/${customer.customerID}`,customer);
    return response.data;
}

export const deleteCustomer = async (customerID: number): Promise<void> => {
    await apiClient.delete(`/Customer/${customerID}`);
}