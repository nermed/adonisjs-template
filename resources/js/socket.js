import io from "../views/layout/plugins/socketio-client/socketio-client";

const socket = io();
socket.on("news", (data) => {
  console.log("received ", data);
  socket.emit("my other event", { my: "data" });
});
