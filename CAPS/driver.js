"use strict";

const event = require("../events.js");
require("dotenv").config();

event.on("pickup", pickUpOrder);

function pickUpOrder(payload) {
  console.log(`EVENT { event: 'pickup',
    time: 2020-03-06T18:27:17.732Z,
    payload:
     { store: ${process.env.SHOP_NAME},
       orderID: ${payload.Address.zipcode},
       customer: ${payload.customer},
       address: ${payload.Address.city + payload.Address.state}`);
  setTimeout(() => {
    event.emit("in-transit", payload);
  }, 1000);
  setTimeout(() => {
    console.log(`DRIVER: delivered up ${payload.Address.zipcode}`);
    event.emit("delivered", payload);
  }, 3000);
}

module.exports = { pickUpOrder };
