import { NotificationType } from "../../../Enums/notificationType";

export interface Notification {
  notificationID: number;  
  title: string;
  message: string;
  type: NotificationType;
  createdDate: string;
  isRead: boolean;     
}