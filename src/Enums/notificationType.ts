export enum NotificationType {
   CustomerCreated = 1,
   ProductCreated = 2,
   OrderCreated= 3,
   StockChanged = 4
}

export const notificationTypeOptions = [
  {
    value: NotificationType.CustomerCreated,  
    label: "Müşteri Oluşturuldu",
  },
  {
    value: NotificationType.ProductCreated,
    label: "Ürün Oluşturuldu",
  },
  {
    value: NotificationType.OrderCreated,
    label: "Sipariş Oluşturuldu",
  },
  {
    value: NotificationType.StockChanged,
    label: "Stok Değişti",
  }
];