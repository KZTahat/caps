"use strict";

require("dotenv").config();
const ioClient = require("socket.io-client");
const faker = require("faker");
const broadcastToCaps = ioClient.connect(`${process.env.HOST}`);
const capsNamespace = ioClient.connect(`${process.env.HOST}/caps`);

setInterval(() => {
  let order = {
    storeId: process.env.STORE_ID,
    orderId: faker.helpers.createCard().address.zipcode,
    customer: faker.name.findName(),
    Address: faker.helpers.createCard().address,
  };
  broadcastToCaps.emit("pickup", order);
}, 5000); //5 seconds

capsNamespace.on("delivered", handelDelivary);

function handelDelivary(payload) {
  console.log(`VENDOR: Thank you for delivering  ${payload.orderId}`);
}

module.exports = { handelDelivary };
