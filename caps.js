"use strict";

const event = require("./events.js");
require("./CAPS/driver.js");
require("./CAPS/vendor.js");

event.on("pickup", (payload) => {
  event.on("in-transit", () => {
    console.log(`Driver: picked up ${payload.Address.zipcode}`);
    console.log(`EVENT { event: 'in-transit',
    time: 2020-03-06T18:27:18.738Z,
    payload:
     { store: ${process.env.SHOP_NAME},
       orderID: ${payload.Address.zipcode},
       customer: ${payload.customer},
       address: ${payload.Address.city + payload.Address.state} }}`);
  });
});
