# cws-backend_bayad-center - REST API

This is a REST API for the Central Wallet System (CWS). The application can
withdraw/deposit funds and verify the default user's current balance.

## Install
    npm install
 
## Run the app 
    npm run dev
    
## REST API
These are the endpoints that I created in order to make the application operational.

## Defaults 
    `USER PIN - 123456`
    `USER BALANCE - 1000`

## Authentication 
| Method | URL           | Body         | Response                                                             | Valid |
|--------|---------------|--------------|----------------------------------------------------------------------|-------|
| POST   | /api/validate | {pin:123456} | {"status": true,"pin_status":true}                                   | Yes   |
| POST   | /api/validate | {pin:654321} | {"title":"Oh, snapp!","message":"Wrong pin code","pin_status":false} | No    |

## Balance Inquiry
| Method | URL                  | Body | Response        | Valid |
|--------|----------------------|------|-----------------|-------|
| GET    | /api/balance-inquiry | -    | {"amount":1000} | Yes   |

## Deposit
| Method | URL          | Body                                                          | Response                                                                                                         | Valid |
|--------|--------------|---------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|-------|
| PUT    | /api/deposit | {"amount":1000}                                               | {"title":"You succesfully deposit with the amount of ₱1,000.00","amount":2000,"status":true}                     | Yes   |
| PUT    | /api/deposit | {"amount:99"}  (Given the amount is > than 10,000)            | {"title":"Transaction denied","message":"The amount needs to be divisible by 100, 500, or 1,000","status":false} | No    |
| PUT    | /api/deposit | {"amount":11000} (Given the amount is > than current balance) | {"title":"Transaction denied","message":"You can deposit up to ₱10,000 per transaction","status":false}          | No    |

## Withdraw
| Method | URL           | Body                                                 | Response                                                                                                           | Valid |
|--------|---------------|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|-------|
| PUT    | /api/withdraw | {"amount":1000}                                      | {"title":"You succesfully withdraw with the amount of ₱1,000.00","amount":1000,"status":true}                      | Yes   |
| PUT    | /api/withdraw | {"amount:3000"}  (Given the amount is > than 10,000) | {"title":"Transaction denied","message":"You have insufficient funds to complete this transaction","status":false} | No    |
| PUT    | /api/withdraw | {"amount":999}                                       | {"title":"Transaction denied","message":"The amount needs to be divisible by 100, 500, or 1,000","status":false}   | No    |
| PUT    | /api/withdraw | {"amount":11000}                                     | {"title":"Transaction denied","message":"You can withdraw up to ₱10,000 per transaction","status":false}           | No    |

## Links

### API PUBLIC URL
[cws.franchescocalonzo.dev](cws.franchescocalonzo.dev/balance-inquiry)

### FRONT-END APPLICATION
[cws-fe.franchescocalonzo.dev](https:cws-fe.franchescocalonzo.dev/)



