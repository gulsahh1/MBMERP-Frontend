import { TransactionType } from "../../../Enums/transactionType";

export interface StockTransaction {
  stockTransactionID: number;
  productID: number;
  quantity: number;
  transactionType: TransactionType; // 1: Stok girişi, 2: Stok çıkışı, 3: Manuel düzeltme
   
}