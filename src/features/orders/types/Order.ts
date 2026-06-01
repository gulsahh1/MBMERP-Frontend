import { OrderStatus } from "../../../Enums/orderStatus";

export interface Order{
    orderID: number;
    customerID: number;
    totalAmount: number;
    orderNumber: string;
    orderStatus: OrderStatus;
    description: string;
    orderDate:string

}