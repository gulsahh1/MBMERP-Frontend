export enum PaymentType {
  Cash = 1,
  CreditCard = 2,
  BankTransfer = 3,
}
export const paymentTypeOptions = [
  {
    value: PaymentType.Cash,
    label: "Nakit",
  },
  {
    value: PaymentType.CreditCard,
    label: "Kredi Kartı",
  },
  {
    value: PaymentType.BankTransfer,
    label: "Banka Transferi",
  },
];