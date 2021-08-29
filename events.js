'use strict';
//singltone for the events
const Events = require('events');

let event = new Events();

module.exports = event;