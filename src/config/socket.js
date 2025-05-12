import socket from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (projectId) => {
  socketInstance = socket(import.meta.env.VITE_API_URL, {
    auth: {
      token: localStorage.getItem("token"),
    },
    query: {
      projectId,
    },
  });

  return socketInstance;
};

export const receiveMessage = (eventName, cb) => {
  console.log("here in socket.js receive message");
  socketInstance.on(eventName, cb);
};

export const sendMessage = (eventName, data) => {
  console.log("here in socket.js send message");
  socketInstance.emit(eventName, data);
  console.log("here in socket.js send message end", data);
};

// import socket from "socket.io-client";

// let socketInstance = null;

// export const initializeSocket = (projectId) => {
//   if (!socketInstance) {
//     console.log("🔌 Connecting to WebSocket...");
//     socketInstance = socket(import.meta.env.VITE_API_URL, {
//       auth: { token: localStorage.getItem("token") },
//       query: { projectId },
//     });

//     socketInstance.on("connect", () => console.log("✅ WebSocket Connected"));
//     socketInstance.on("disconnect", () =>
//       console.log("❌ WebSocket Disconnected")
//     );
//   }

//   return socketInstance;
// };

// export const receiveMessage = (eventName, cb) => {
//   console.log("here in socket.js receive message");
//   socketInstance.on(eventName, cb);
// };

// export const sendMessage = (eventName, data) => {
//   console.log("here in socket.js send message");
//   socketInstance.emit(eventName, data);
// };
