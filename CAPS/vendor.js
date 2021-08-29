"use strict";

require("dotenv").config();
const faker = require("faker");
const event = require("../events.js");

event.on("delivered", (payload) => {
  console.log(`VENDOR: Thank you for delivering  ${payload.Address.zipcode}`);
  console.log(`EVENT { event: 'delivered',
  time: 2020-03-06T18:27:20.736Z,
  payload:
   { store: ${process.env.SHOP_NAME},
     orderID: ${payload.Address.zipcode},
     customer: ${payload.customer},
     address: ${payload.Address.city + payload.Address.state} }}`);
});

setInterval(() => {
  let order = {
    customer: faker.name.findName(),
    Email: faker.internet.email(),
    Address: faker.helpers.createCard().address,
    Phone: faker.helpers.createCard().phone,
  };
  event.emit("pickup", order);
}, 5000); //5 seconds
