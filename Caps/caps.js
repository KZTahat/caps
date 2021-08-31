"use strict";

require("dotenv").config();
const io = require("socket.io")(process.env.PORT);
const caps = io.of("/caps");

io.on("connection", (socket) => {
  console.log("connected to broadcast channel 😁");
  
  socket.on("pickup", (payload) => {
    console.log(`EVENT { event: 'pickup',
    time: ${new Date()},
    payload:
     { storeId: ${process.env.STORE_ID},
       orderId: ${payload.orderId},
       customer: ${payload.customer},
       address: ${payload.Address.city + payload.Address.state}`);

    //redirect to Queue to add the order
    caps.emit("addToQueue", payload);
    //redirect to driver
    io.emit("pickup", payload);
  });
});

caps.on("connection", (socket) => {
  console.log("connected to namespace caps 😎");

  socket.on("in-transit", (payload) => {
    console.log(`EVENT { event: "in-transit",
    time: ${new Date()},
    payload:
     { storeId: ${process.env.STORE_ID},
     orderId: ${payload.orderId},
       customer: ${payload.customer},
       address: ${payload.Address.city + payload.Address.state}`);
  });
  socket.on("delivered", (payload) => {
    console.log(`EVENT { event: "delivered",
    time: ${new Date()},
    payload:
     { storeId: ${process.env.STORE_ID},
       orderId: ${payload.orderId},
       customer: ${payload.customer},
       address: ${payload.Address.city + payload.Address.state}`);

    //redirect to vendor.js
    caps.emit("delivered", payload);
  });

  socket.on("received", (payload) => {
    //redirect to queue.js
    caps.emit("received", payload);
  });

  socket.on("getAll", () => {
    //redirect to queue.js
    caps.emit("getAll");
  });

  socket.on("printAllmessages", (payload) => {
    //redirect to vendor.js
    caps.emit("delivered", payload);
  });
});
