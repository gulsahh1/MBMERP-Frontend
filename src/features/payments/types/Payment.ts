import { PaymentType } from "../../../Enums/paymentType";

export interface Payment {
  paymentID: number;
  customerID: number;
  amount: number;
  date: string; // ISO format date string
  paymentType: PaymentType; // e.g., "Cash", "Credit Card", "Bank Transfer"
}