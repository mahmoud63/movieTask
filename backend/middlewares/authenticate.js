const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

exports.authenticateJWT = (req, res, next) => {
  console.log(jwtSecret);
  try {
    // console.log('starting', req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, jwtSecret);
    console.log(decodedToken);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,

      token: token,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Token!" });
  }
};
