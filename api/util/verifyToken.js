const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send("no token provided");
    }

    console.log(token);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.decoded = decoded;

    return next();
  } catch (err) {
    res.status(401).send("unauthorised");
  }
};

module.exports = verify;
