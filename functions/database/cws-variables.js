// Database Defaults

const defaultPin = 123456;
var balance = 1000;

function getBalance() {
  return balance;
}

function doDeposit(amount) {
  balance = balance + Number(amount);
  return balance;
}

function doWithdraw(amount) {
  balance = balance - Number(amount);
  return balance;
}

function getDefaultPin() {
  return defaultPin;
}

exports.getBalance = getBalance;
exports.doWithdraw = doWithdraw;
exports.doDeposit = doDeposit;
exports.getDefaultPin = getDefaultPin;
