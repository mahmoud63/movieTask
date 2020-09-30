const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/user");

exports.customerLogin = (req, res, next) => {
  let fetchedCustomer;
  User.findOne({ where: { Email: req.body.email } })
    .then((customer) => {
      console.log(`customer: ${req.body.email} & response: ${customer}`);
      if (!customer) {
        throw "This email does not exist";
      }
      fetchedCustomer = customer;
      console.log(fetchedCustomer.Password, req.body.password);
      return req.body.password === fetchedCustomer.Password;
    })
    .then((result) => {
      if (result == false) {
        throw "incorrect password, please try again";
      }
      let { Email, ID } = fetchedCustomer;
      const token = jwt.sign(
        {
          email: Email,
          userId: ID,
        },
        jwtSecret,
        { expiresIn: "1d" }
      );
      res.status(200).json({
        token: token,
        userId: ID,
        step: 7,
      });
    })
    .catch((err) => {
      let error = err.message ? err.message : err;
      console.log(err);
      return res.status(401).json({ message: error });
    });
};
