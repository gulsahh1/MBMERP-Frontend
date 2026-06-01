
export enum OrderStatus{
     Pending = 1,
     Approved = 2,
     Shipped = 3,
     Completed = 4,
     Cancelled = 5
}

export const OrderStatusOptions =
[
     {
         value : OrderStatus.Pending,
         label : "Beklemede"
     },
     {
         value : OrderStatus.Approved,
         label : "Onaylandı"
     },
     {
         value : OrderStatus.Shipped,
         label : "Kargolandı/Sevk Edildi"
     },
     {
         value : OrderStatus.Completed,
         label : "Tamamlandı"
     },
     {
          value: OrderStatus.Cancelled,
          Label:"İptal Edildi"
     }

]