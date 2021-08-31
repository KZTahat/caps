"use strict";

const ioClient = require("socket.io-client");
require("dotenv").config();
const capsNamespace = ioClient.connect(`${process.env.HOST}/caps`);

const queue = {
  messages: {},
};

//for testing ..
const broadcastToCaps = ioClient.connect(`${process.env.HOST}`);
const uuid = require("uuid").v4;
const faker = require("faker");

setInterval(() => {
  let order = {
    storeId: process.env.STORE_ID,
    orderId: faker.helpers.createCard().address.zipcode,
    customer: faker.name.findName(),
    Address: faker.helpers.createCard().address,
    messageId: uuid(),
  };
  broadcastToCaps.emit("pickup", order);
}, 5000); //5 seconds

capsNamespace.on("getAll", () => {
  //this should return all the messages with specific IDs
  Object.keys(queue.messages).forEach((message) => {
    // redirect to printAllmessages to trigger the delivered event n times
    capsNamespace.emit("printAllmessages", {
      orderId: queue.messages[message].orderId,
      messageId: message,
    });
  });
});

capsNamespace.on("received", (payload) => {
  //this will delete the message from the queue
  console.log(`deleting ${payload.messageId} from Queue . . .`);
  delete queue.messages[payload.messageId];
});

capsNamespace.on("addToQueue", (payload) => {
  //this will add each new order to the queue
  queue.messages[payload.messageId] = payload;
  console.log(`add to queue 😲 ${payload.messageId}, order ID: ${payload.orderId}`);
});
