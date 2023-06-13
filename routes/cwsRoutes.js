const express = require("express");
const router = express.Router();
const {
  getBalance,
  depositRequest,
  withdrawRequest,
  doValidate,
} = require("../controlllers/cwsController");

router.route("/balance-inquiry").get(getBalance);

router.route("/deposit").put(depositRequest);

router.route("/withdraw").put(withdrawRequest);

router.route("/validate").post(doValidate);

module.exports = router;
