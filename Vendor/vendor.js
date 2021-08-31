"use strict";

require("dotenv").config();
const ioClient = require("socket.io-client");
const faker = require("faker");
const capsNamespace = ioClient.connect(`${process.env.HOST}/caps`);

//triggering getAll event to get all missed recived orders
capsNamespace.emit('getAll');

capsNamespace.on("delivered", handelDelivary);

function handelDelivary(payload) {
  console.log(`VENDOR: Thank you for delivering  ${payload.orderId}`);
  
  //triggering recived event to delete order from queue
  capsNamespace.emit("received", payload);
}

module.exports = { handelDelivary };
