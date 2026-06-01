import { CustomerType } from "../../../Enums/customerType";

export interface Customer {
  customerID: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  balance: number;
  customerType: CustomerType | "";
}