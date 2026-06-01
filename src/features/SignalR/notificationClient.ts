import * as signalR from "@microsoft/signalr";

const notificationConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7267/hubs/notification")
  .withAutomaticReconnect()
  .build();

export default notificationConnection;