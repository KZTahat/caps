"use strict";

const { pickUpOrder } = require("../CAPS/driver.js");
const { handelDelivary } = require('../CAPS/vendor.js');
const faker = require("faker");

describe("pickUpOrder check", () => {
  //arrange
  let consoleSpy;
  let payload = {
    customer: faker.name.findName(),
    Email: faker.internet.email(),
    Address: faker.helpers.createCard().address,
    Phone: faker.helpers.createCard().phone,
  };
  let next = jest.fn(); // spy on next method

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test("pickUpOrder should log to the console", async () => {
    //act
    await pickUpOrder(payload);
    //assert
    expect(consoleSpy).toHaveBeenCalled();
  });
  test("handelDelivary should log to the console", async () => {
    //act
    await handelDelivary(payload);
    //assert
    expect(consoleSpy).toHaveBeenCalled();
  });
});
