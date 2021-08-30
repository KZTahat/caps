"use strict";

require("dotenv").config();
const ioClient = require("socket.io-client");
const broadcastToCaps = ioClient.connect(`${process.env.HOST}`);
const capsNamespace = ioClient.connect(`${process.env.HOST}/caps`);

broadcastToCaps.on("pickup", pickUpOrder);

function pickUpOrder(payload) {
  setTimeout(() => {
    console.log(`picking up ${payload.orderId} . . .`);
    capsNamespace.emit("in-transit", payload);
  }, 1500);
  setTimeout(() => {
    console.log(`DRIVER: delivered up ${payload.orderId} 🤩`);
    capsNamespace.emit("delivered", payload);
  }, 3000);
}


module.exports = { pickUpOrder };
