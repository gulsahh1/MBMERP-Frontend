import { apiClient } from "../../../api/apiClient";
import { LoginRequest, RegisterRequest } from "../types/authTypes";

export const login = async (data: any) => {
  const response = await apiClient.post("/Auth/login", data);

  return response.data;
};

export const register = async (data: any) => {
  const response = await apiClient.post("/Auth/register", data);

  return response.data;
};