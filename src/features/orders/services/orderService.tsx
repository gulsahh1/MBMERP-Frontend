import { apiClient } from "../../../api/apiClient";
import { Order } from "../types/Order";


export const getOrders = async() : Promise<Order[]>=>{
    const response = await apiClient.get("/Order")
    return response.data;

}

export const createOrder = async(order:Omit<Order,"orderID">):Promise<Order>=>{
    const response = await apiClient.post("/Order",order)
    return response.data;
}

export const updateOrder = async(order:Order):Promise<Order>=>{
    const response = await apiClient.put(`/Order/${order.orderID}`,order);
    return response.data;
}

export const deleteOrder = async(orderID:number): Promise<void> =>{
    await apiClient.delete(`/Order/${orderID}`)
}