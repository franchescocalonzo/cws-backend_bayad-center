const database = require("../database/cws-variables");

//@desc Current balance request
//@route /api/balance-inquiry
const getBalance = (req, res) => {
  const balance = database.getBalance();
  res.status(200).json({ amount: `${balance}` });
};

//@desc Deposit request
//@route /api/deposit
const depositRequest = (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== "number") {
    res.status(400).send({ message: "Bad request." });
  }

  // amount should be less than 10,000
  if (amount <= 10000) {
    // amount should be divisible by 100, 500 or 1000
    if (amount % 100 == 0 || amount % 500 == 0 || amount % 100 == 0) {
      const currentBalance = database.doDeposit(amount);
      res.status(200).json({
        title: `You succesfully deposit with the amount of ₱${Number(amount).toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        amount: currentBalance,
        status: true,
      });
    } else {
      res.status(200).json({
        title: "Transaction denied",
        message: `The amount needs to be divisible by 100, 500, or 1,000`,
        status: false,
      });
    }
  } else {
    res.status(200).json({
      title: "Transaction denied",
      message: `You can deposit up to ₱10,000 per transaction`,
      status: false,
    });
  }
};

//@desc Withdraw Request
//@route /api/withdraw
const withdrawRequest = (req, res) => {
  const { amount } = req.body;
  const currentBalance = database.getBalance();
  if (!amount || typeof amount !== "number" || amount == 0) {
    res.status(400).send({ message: "Bad request." });
  }

  // amount should be less than or equal to the current amount
  if (amount <= currentBalance) {
    // amount should be less than 10,000
    if (amount <= 10000) {
      // amount should be divisible by 100, 500 or 1000
      if (amount % 100 == 0 || amount % 500 == 0 || amount % 100 == 0) {
        const balance = database.doWithdraw(amount);
        res.status(200).json({
          title: `You succesfully withdraw with the amount of ₱${Number(amount).toLocaleString(
            "en",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`,
          amount: balance,
          status: true,
        });
      } else {
        res.status(200).json({
          title: "Transaction denied",
          message: `The amount needs to be divisible by 100, 500, or 1,000`,
          status: false,
        });
      }
    } else {
      res.status(200).json({
        title: "Transaction denied",
        message: "You can withdraw up to ₱10,000 per transaction",
        status: false,
      });
    }
  } else {
    res.status(200).json({
      title: "Transaction denied",
      message: "You have insufficient funds to complete this transaction",
      status: false,
    });
  }
};

//@desc Validate Pin
//@route /api/validate
const doValidate = (req, res) => {
  const { pin } = req.body;

  const defaultPin = database.getDefaultPin();

  // PIN validation
  if (pin === defaultPin) {
    res.status(200).json({ status: true, pin_status: true });
  } else if (!pin || !req.body) {
    res.status(400).send({ message: "Bad request." });
  } else {
    res.status(200).json({ title: "Oh, snapp!", message: "Wrong pin code", pin_status: false });
  }
};

module.exports = { getBalance, depositRequest, withdrawRequest, doValidate };
