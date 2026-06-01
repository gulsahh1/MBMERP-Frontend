import { apiClient } from "../../../api/apiClient";
import { Notification } from "../types/Notification";

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await apiClient.get("/Notification");
  return response.data;
}