import { apiClient } from "../../../api/apiClient";
import { Payment } from "../types/Payment";

export const getPayments = async(): Promise<Payment[]>=>{
    const response  = await apiClient.get("/Payment");
    return response.data;
}

export const createPayment = async (payment:Omit<Payment,"paymentID">):Promise<Payment> =>{
    const response = await apiClient.post("/Payment",payment);
    return response.data;
}

export const updatePayment = async (payment:Payment):Promise<Payment> =>{
    const response = await apiClient.put(`/Payment/${payment.paymentID}`,payment);
    return response.data;
}

export const deletePayment = async (paymentID: number): Promise<void> => {
    await apiClient.delete(`/Payment/${paymentID}`);
}