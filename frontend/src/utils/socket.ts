const SERVER = process.env.NEXT_PUBLIC_SERVER_SOCKET_URl as string;

export const socket = new WebSocket(SERVER);

socket.onopen = () => {
  console.log("Connection established");
};

socket.onclose = () => {
  console.log("Disconnected");
};
