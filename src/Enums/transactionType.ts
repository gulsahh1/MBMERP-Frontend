export enum TransactionType {
  Purchase = 1, // Stok girişi
  Sale = 2, // Stok çıkışı
  Adjustment = 3, // Manuel düzeltme
}


export const transactionTypeOptions = [
  {
    value: TransactionType.Purchase,    
    label: "Satın Alma",
    },
    {
    value: TransactionType.Sale,
    label: "Satış",
    },
    {
    value: TransactionType.Adjustment,
    label: "Düzeltme",
    },
];  