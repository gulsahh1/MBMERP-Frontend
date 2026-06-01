import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7267/hubs/dashboard")
  .withAutomaticReconnect()
  .build();

export default connection;