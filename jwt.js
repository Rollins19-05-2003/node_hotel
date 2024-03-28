// ------------------------ Token Based Authentication and Authorization ------------------------
const jwt = require("jsonwebtoken");

// ------------------------ Token Generation ------------------------
const generateToken = (userData) => {
  return jwt.sign({userData}, process.env.JWT_SECRET, { expiresIn: 30000 });
};

// ------------------------ Token Verification ------------------------
const jsonAuthMiddleware = (req, res, next) => {
  // first check request headers has authorization or not
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: "Token not found" });

  // Extract the jwt token from the request header
  const token = req.headers.authorization.split(' ')[1];
  // if token not present then return error
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  // if present then --
  try {
    // verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attatched the user info to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = { jsonAuthMiddleware, generateToken };
