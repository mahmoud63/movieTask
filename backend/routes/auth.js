const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.post("/signin", authController.customerLogin);

module.exports = router;
