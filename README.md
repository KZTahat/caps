# LAB - 11

## Author: Khaled Tahat

## Setup

- .env requirements
- SHOP_NAME = flower shop

- Running the app

  - node caps.js

- output shape:

```
    EVENT { event: 'pickup',
    time: 2020-03-06T18:27:17.732Z,
    payload:
     { store: flower shop,
       orderID: 17187-3529,
       customer: Martha Hartmann,
       address: Port NellaTexas }}
Driver: picked up 17187-3529
EVENT { event: 'in-transit',
    time: 2020-03-06T18:27:18.738Z,
    payload:
     { store: flower shop,
       orderID: 17187-3529,
       customer: Martha Hartmann,
       address: Port NellaTexas }}
DRIVER: delivered up 17187-3529
VENDOR: Thank you for delivering  17187-3529
EVENT { event: 'delivered',
  time: 2020-03-06T18:27:20.736Z,
  payload:
   { store: flower shop,
     orderID: 17187-3529,
     customer: Martha Hartmann,
     address: Port NellaTexas }}
```

UML
<img src="./CAPS.png"
     alt="code-challenge-2 whiteBoard"
     style="float: left; margin-right: 10px;" />
