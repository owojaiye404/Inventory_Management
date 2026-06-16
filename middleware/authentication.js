const jwt = require("jsonwebtoken");

exports.authentication = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .json({ success: false, error: { message: "Unauthorized" } });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res
      .status(400)
      .json({ success: false, error: { message: "token required" } });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error(err.message);
    return res
      .status(400)
      .json({ success: false, error: { message: "Invalid or expired token" } });
  }

  req.user = decoded;

  next();
};
