"use strict";

const { handelDelivary } = require("../vendor.js");

describe("handelDelivary check", () => {
  //arrange
  let consoleSpy;
  let payload = {
    orderId: 89327156,//test ID
  };

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test("handelDelivary should log to the console", async () => {
    //act
    handelDelivary(payload);
    //assert
    expect(consoleSpy).toHaveBeenCalled();
  });
});
